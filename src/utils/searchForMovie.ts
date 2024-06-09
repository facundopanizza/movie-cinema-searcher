import { config } from '../config';
import { IMovie } from '../types/movie.interface';
import Fuse, { FuseResult } from 'fuse.js';

export interface ISearchResult {
  keyword: string;
  results: FuseResult<IMovie>[];
}

export const searchForMovie = (movies: IMovie[]): ISearchResult[] => {
  const keywords = config.keywords.split(',');

  const fuse = new Fuse(movies, {
    keys: ['name'],
    threshold: 0.2,
  });

  const resultsByKeyword: ISearchResult[] = [];

  keywords.forEach((keyword) => {
    const results = fuse.search(keyword);

    if (results.length > 0) {
      resultsByKeyword.push({ keyword, results: results });
    }
  });

  return resultsByKeyword;
};
