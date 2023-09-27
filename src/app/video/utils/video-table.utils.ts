import { MatSort } from '@angular/material/sort';
import { ProcessedVideo } from '../models/video.interfaces';
import { isBetterResolution } from './video.utils';

export const tableSorting = (
  items: ProcessedVideo[],
  sort: MatSort
): ProcessedVideo[] => {
  return !sort.active || sort.direction === ''
    ? items
    : items.sort((first: ProcessedVideo, second: ProcessedVideo) => {
        let comparatorResult = 0;

        switch (sort.active) {
          case 'name':
            comparatorResult = compareNames(first, second);
            break;
          case 'author':
            comparatorResult = compareAuthorsNames(first, second);
            break;
          case 'categories':
            comparatorResult = compareCategories(first, second);
            break;
          case 'bestFormatName':
            comparatorResult = compareBestFormatNames(first, second);
            break;
          case 'releaseDate':
            comparatorResult = compareReleaseDates(first, second);
            break;
          default:
            comparatorResult = compareNames(first, second);
            break;
        }

        return applyDirection(comparatorResult, sort.direction);
      });
};

const compareNames = (first: ProcessedVideo, second: ProcessedVideo): number =>
  first.name.localeCompare(second.name);

const compareAuthorsNames = (
  first: ProcessedVideo,
  second: ProcessedVideo
): number => first.author.name.localeCompare(second.author.name);

const compareCategories = (
  first: ProcessedVideo,
  second: ProcessedVideo
): number => (first.categories.length > second.categories.length ? 1 : -1);

const compareBestFormatNames = (
  first: ProcessedVideo,
  second: ProcessedVideo
): number =>
  isBetterResolution(first.bestFormatRes, second.bestFormatRes) ? -1 : 1;

const compareReleaseDates = (
  first: ProcessedVideo,
  second: ProcessedVideo
): number =>
  new Date(first.releaseDate) > new Date(second.releaseDate) ? 1 : -1;

const applyDirection = (comparatorResult: number, direction: string) =>
  comparatorResult * (direction == 'asc' ? 1 : -1);
