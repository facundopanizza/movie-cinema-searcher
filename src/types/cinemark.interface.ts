interface ICinema {
  Id: number;
  Name: string;
  City: string;
  Address: string;
  Description: string;
  Features: string;
  decLatitude: string;
  decLongitude: string;
  Metro: string;
  Buses: string;
  Manager: string;
  URLThumb: string;
  URLGoogleMaps: string;
}

interface IPerson {
  Type: string;
  Name: string;
}

interface IFilm {
  Name: string;
  Id: string;
  Rating: string;
  FilmCode: string;
  Distributor: string;
  Description: string;
  Duration: string;
  Category: string;
  OpeningDate: string;
  URLPoster: string;
  URLTrailerAmazon: string;
  URLTrailerYoutube: string;
  TWHashTag: string;
  PersonList: IPerson[];
  AttributeList: any[];
  FormatList: string[];
  CinemaList: number[];
  MovieList: IMovie[];
}

interface IMovie {
  Id: number;
  Format: string;
  Version: string;
  CinemaList: ICinemaInList[];
}

interface ICinemaInList {
  Id: number;
  SessionList: ISession[];
}

interface ISession {
  i: number;
  f: number;
  s: number;
  d: string;
  p: number;
}

interface IComingSoonFilm {
  Id: number;
  Name: string;
  Description: string;
  OpeningDate: string;
  URLTrailerYoutube: string;
  Duration: number;
  Category: string;
  Rating: string;
  URLPoster: string;
  TWHashTag: string;
}

interface IHighlight {
  Id: number;
  strTitle: string;
  strDescription: string;
  bitButton: boolean;
  strButtonText: string;
  strButtonAction: string;
  strURLImage: string;
  strURLImageMobile: string;
  jsonLoyaltyLevel: number[];
}

interface IBillboard {
  BillboardId: number;
  Title: string;
  Formats: string[];
  jsonTagsId: number[];
}

interface IFilmsBanner {
  ID: number;
  intPosition: number;
  strLink: string;
  strURLImagePath: string;
}

interface ISectionBanner {
  ID: number;
  intPosition: number;
  strSectionTitle: string;
  strLink: string;
  strURLImagePath: string;
  jsonLoyaltyLevel: number[];
}

interface IFilmAttribute {
  intAttributeId: number;
  strTitle: string;
  strPosterMessage: string;
  strPosterCss: string;
  strSessionMessage: string;
  strSessionCss: string;
  strPopinMessage: string;
  strPopinCss: string;
}

export interface DataInterface {
  jsonData: {
    TimeStamp: number;
    Cinemas: ICinema[];
    Films: IFilm[];
    ComingSoonFilms: IComingSoonFilm[];
    Highlights: IHighlight[];
    Billboards: IBillboard[];
    FilmsBanners: IFilmsBanner[];
    SectionBanners: ISectionBanner[];
    FilmsAttributes: IFilmAttribute[];
  };
}
