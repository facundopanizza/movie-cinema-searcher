import axios, { AxiosInstance } from 'axios';
import { ICinepolisResponse } from '../types/cinepolis.interface';
import { IMovie } from '../types/movie.interface';
import { IScrapper } from '../types/scrapper.interface';

export class CinepolisScrapper implements IScrapper {
  private readonly url = 'https://www.cinepolis.com.ar/api';
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: this.url,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getMovies(): Promise<IMovie[]> {
    try {
      const response = await this.api.get<ICinepolisResponse>(
        '/movies?view=movies'
      );

      return response.data.data.map((movie) => ({
        name: movie.title_translated,
      }));
    } catch (error) {
      console.error('Cinepolis Scrapper - Error getting movies', error);

      return [];
    }
  }
}
