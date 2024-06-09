import { CinemarkScrapper } from './scrappers/cinemark.scrapper';
import { CinepolisScrapper } from './scrappers/cinepolis.scrapper';
import { searchForMovie } from './utils/searchForMovie';
import {
  ISearchResultData,
  TEMPLATES,
  getHtmlFromTemplate,
} from './utils/handlebars';
import { Sendgrid } from './utils/sendgrid';
import { CronJob } from 'cron';
import { config } from './config';

const main = async () => {
  console.info('Running cronjob at', new Date().toISOString());

  const cinemarkScrapper = new CinemarkScrapper();
  const cinepolisScrapper = new CinepolisScrapper();

  const [cinemarkMovies, cinepolisMovies] = await Promise.all([
    cinemarkScrapper.getMovies(),
    cinepolisScrapper.getMovies(),
  ]);

  const cinemarkResults = searchForMovie(cinemarkMovies);
  const cinepolisResults = searchForMovie(cinepolisMovies);

  const sendgrid = new Sendgrid();

  console.info('Found results', cinemarkResults, cinepolisResults);

  const dataToSend: ISearchResultData = { cinemas: [] };

  if (!cinemarkResults.length && !cinepolisResults.length) {
    console.info('No results found');
    return;
  }

  if (cinemarkResults.length > 0) {
    dataToSend.cinemas.push({
      name: 'Cinemark',
      found: cinemarkResults,
    });
  }

  if (cinepolisResults.length > 0) {
    dataToSend.cinemas.push({
      name: 'Cinepolis',
      found: cinepolisResults,
    });
  }

  const html = getHtmlFromTemplate(TEMPLATES.SEARCH_RESULTS, {
    cinemas: [
      {
        name: 'Cinemark',
        found: cinemarkResults,
      },
      {
        name: 'Cinepolis',
        found: cinepolisResults,
      },
    ],
  });

  await sendgrid.sendEmail('Movie Search Results', html);
  console.info('Email sent');
};

console.info('Starting cronjob');

// Schedule the main function to run every minute
const job = new CronJob(
  config.cronExpression,
  main,
  null,
  true,
  'America/Argentina/Buenos_Aires'
);
job.start();
