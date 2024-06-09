import { IMovie } from './movie.interface';

export interface IScrapper {
  getMovies(): Promise<IMovie[]>;
}
