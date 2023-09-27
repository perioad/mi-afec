export interface Category {
  id: number;
  name: string;
}

export interface CategoriesMap {
  [id: string]: string;
}

export interface Format {
  res: Resolution;
  size: number;
}

export interface Formats {
  [name: string]: Format;
}

export interface BestFormat {
  name: string;
  res: Resolution;
  size: number;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
  formats: Formats;
  releaseDate: string;
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface ProcessedVideo extends Omit<Video, 'catIds'> {
  author: Omit<Author, 'videos'>;
  categories: Category[];
  bestFormatName: string;
  bestFormatRes: Resolution;
  searchIndex: string;
}

export enum Resolution {
  SD = '480p',
  HD = '720p',
  FHD = '1080p',
}
