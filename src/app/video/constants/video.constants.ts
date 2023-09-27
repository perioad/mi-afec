import { Formats, Resolution } from '../models/video.interfaces';

export const RELEASE_DATE_FORMAT = 'dd.MM.yyyy';

export const RELEASE_DATE_UNKNOWN = 'Unknown';

export const VIDEO_RESOLUTIONS = Object.values(Resolution);

export const NEW_VIDEO_FORMATS: Formats = {
  one: {
    res: Resolution.FHD,
    size: 1000,
  },
};
