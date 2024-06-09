interface IMovie {
  id: number;
  title_translated: string;
  slug: string;
  poster_path: string;
  release_date: string;
  badge_string: string | null;
  badge_color: string | null;
  category: string | null;
  grouping: string;
  poster_url: string;
}

interface IAggregation {
  complex: number[];
  screens: string[];
  dates: string[];
  versions: string[];
  formats: string[];
  types: string[];
  categories: string[];
}

export interface ICinepolisResponse {
  data: IMovie[];
  aggregations: IAggregation;
}
