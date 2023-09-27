import { formatDate } from '@angular/common';
import { getSearchIndex } from './search.utils';
import {
  Author,
  BestFormat,
  CategoriesMap,
  Category,
  Format,
  Formats,
  ProcessedVideo,
  Resolution,
  Video,
} from '../models/video.interfaces';
import { VIDEO_RESOLUTIONS } from '../constants/video.constants';
import { omit } from 'lodash';

export const getProcessedVideos = (
  author: Author,
  categories: CategoriesMap
): ProcessedVideo[] =>
  author.videos.map((video: Video) =>
    getProcessedVideo(video, categories, author)
  );

export const getLatestVideoId = (authors: Author[]): number => {
  let latestVideoId = 0;

  for (const author of authors) {
    for (const video of author.videos) {
      if (video.id > latestVideoId) {
        latestVideoId = video.id;
      }
    }
  }

  return latestVideoId;
};

export const isBetterResolution = (
  firstRes: Resolution,
  secondRes: Resolution
): boolean =>
  VIDEO_RESOLUTIONS.indexOf(firstRes) < VIDEO_RESOLUTIONS.indexOf(secondRes);

const getProcessedVideo = (
  { id, name, catIds, formats, releaseDate }: Video,
  categories: CategoriesMap,
  author: Author
): ProcessedVideo => {
  const processedCategories = processCategories(catIds, categories);
  const bestFormat = getBestFormat(formats);
  const bestFormatName = getBestFormatName(bestFormat);
  const processedVideo = {
    id,
    name,
    author: omit(author, 'videos'),
    categories: processedCategories,
    releaseDate,
    bestFormatName,
    bestFormatRes: bestFormat.res,
    catIds,
    formats,
    searchIndex: '',
  };

  processedVideo.searchIndex = getSearchIndex(
    name,
    author.name,
    ...processedCategories.map(({ name }: Category) => name),
    bestFormatName
  );

  return processedVideo;
};

const processCategories = (
  categoriesIds: number[],
  categories: CategoriesMap
): Category[] => categoriesIds.map((id) => ({ id, name: categories[id] }));

const getBestFormat = (formats: Formats): BestFormat => {
  const currentBest: BestFormat = {
    name: '',
    res: '' as Resolution,
    size: -1,
  };

  for (const [name, format] of Object.entries(formats)) {
    if (isBetterFormat(currentBest, format)) {
      currentBest.name = name;
      currentBest.res = format.res;
      currentBest.size = format.size;
    }
  }

  return currentBest;
};

const isBetterFormat = (currentBest: BestFormat, format: Format): boolean =>
  currentBest.size < format.size ||
  (currentBest.size === format.size &&
    isBetterResolution(currentBest.res, format.res));

const getBestFormatName = (bestFormat: BestFormat): string =>
  `${bestFormat.name} ${bestFormat.res}`;
