import fs from 'fs';
import handlebars from 'handlebars';
import { ISearchResult } from './searchForMovie';

export interface ISearchResultData {
  cinemas: {
    name: string;
    found: ISearchResult[];
  }[];
}

export enum TEMPLATES {
  SEARCH_RESULTS = 'search-results',
}

export const getHtmlFromTemplate = (
  templateName: TEMPLATES,
  data: ISearchResultData
): string => {
  const templateFile = fs.readFileSync(
    `templates/${templateName}.html`,
    'utf8'
  );
  const template = handlebars.compile(templateFile);

  return template(data);
};
