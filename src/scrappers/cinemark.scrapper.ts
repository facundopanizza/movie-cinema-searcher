import axios, { AxiosInstance } from 'axios';
import { load } from 'cheerio';
import vm from 'vm';
import { DataInterface } from '../types/cinemark.interface';
import { IScrapper } from '../types/scrapper.interface';
import { IMovie } from '../types/movie.interface';

export class CinemarkScrapper implements IScrapper {
  private readonly url = 'https://www.cinemarkhoyts.com.ar/';
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: this.url,
    });
  }

  async getMovies(): Promise<IMovie[]> {
    try {
      const homePageSourceCode = await this.api.get('/');

      const $ = load(homePageSourceCode.data);
      const scriptElement = $('script')
        .toArray()
        .find(
          (script) =>
            $(script).attr('src') &&
            $(script).attr('src')?.startsWith('/ws/Billboard')
        );

      if (!scriptElement) {
        throw new Error('Cinemark Scrapper - Script element not found');
      }
      const scriptUrl = scriptElement.attribs.src;

      const scriptWithMovies = await this.api.get(scriptUrl);

      const sandbox = {} as DataInterface;
      const script = new vm.Script(scriptWithMovies.data);
      const context = vm.createContext(sandbox);

      script.runInContext(context);

      return sandbox.jsonData.Films.map((film) => ({
        name: film.Name,
      }));
    } catch (error) {
      console.error('Cinemark Scrapper - Error getting movies', error);

      return [];
    }
  }
}
