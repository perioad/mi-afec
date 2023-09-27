import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  combineLatest,
  concatMap,
  filter,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import {
  API_AUTHORS,
  API_CATEGORIES,
} from '../../../core/constants/api.constants';
import {
  Category,
  Author,
  ProcessedVideo,
  CategoriesMap,
  Video,
} from '../../models/video.interfaces';
import { getLatestVideoId, getProcessedVideos } from '../../utils/video.utils';
import { VideoForm } from '../../models/video-form.interfaces';
import { NEW_VIDEO_FORMATS } from '../../constants/video.constants';

@Injectable({
  providedIn: 'root',
})
export class VideoApiService {
  private categories: Category[] | null = null;
  private authors: Author[] | null = null;
  private videos: ProcessedVideo[] | null = null;
  private latestVideoId: number | null = null;

  constructor(private http: HttpClient) {}

  public getVideos$(): Observable<ProcessedVideo[]> {
    return this.videos
      ? of(this.videos)
      : combineLatest([this.getCategoriesMap$(), this.getAuthors$()]).pipe(
          map(([categories, authors]: [CategoriesMap, Author[]]) =>
            authors.flatMap((author) => getProcessedVideos(author, categories))
          ),
          tap((videos: ProcessedVideo[]) => {
            this.videos = videos;
          })
        );
  }

  public getVideo$(videoId: number): Observable<ProcessedVideo | undefined> {
    return this.getVideos$().pipe(
      map((videos: ProcessedVideo[]) =>
        videos.find(({ id }: ProcessedVideo) => id === videoId)
      )
    );
  }

  public getCategories$(): Observable<Category[]> {
    return this.categories
      ? of(this.categories)
      : this.fetchCategories$().pipe(
          tap((categories) => {
            this.categories = categories;
          })
        );
  }

  public getAuthors$(): Observable<Author[]> {
    return this.authors
      ? of(this.authors)
      : this.fetchAuthors$().pipe(
          tap((authors) => {
            this.authors = authors;
            this.latestVideoId = getLatestVideoId(authors);
          })
        );
  }

  public addNewVideo$({
    name,
    authorId,
    categoriesIds,
  }: VideoForm): Observable<Author> {
    const selectedAuthorId = Number(authorId);
    const newVideo: Video = {
      id: this.latestVideoId! + 1,
      name,
      catIds: categoriesIds,
      formats: NEW_VIDEO_FORMATS,
      releaseDate: '',
    };

    return this.addVideo$(newVideo, selectedAuthorId);
  }

  public editVideo$(
    { name, authorId, categoriesIds }: VideoForm,
    videoToEdit: ProcessedVideo
  ): Observable<Author> {
    const selectedAuthorId = Number(authorId);
    const updatedVideo: Video = {
      id: videoToEdit.id,
      name,
      catIds: categoriesIds,
      formats: videoToEdit.formats,
      releaseDate: videoToEdit.releaseDate,
    };
    const isSameAuthor = selectedAuthorId === videoToEdit.author.id;

    return isSameAuthor
      ? this.updateVideoSameAuthor$(updatedVideo, selectedAuthorId)
      : this.updateVideoDifferentAuthor$(
          updatedVideo,
          selectedAuthorId,
          videoToEdit.author.id
        );
  }

  public deleteVideo$(videoId: number, authorId: number): Observable<Author> {
    return this.getAuthors$().pipe(
      map((authors: Author[]) =>
        authors.find(({ id }: Author) => id === authorId)
      ),
      filter(Boolean),
      map(({ videos }: Author) =>
        videos.filter(({ id }: Video) => id !== videoId)
      ),
      mergeMap((videos: Video[]) => this.patchAuthor$(authorId, { videos })),
      tap(() => {
        this.resetCachedData();
      })
    );
  }

  private addVideo$(video: Video, authorId: number): Observable<Author> {
    return this.getAuthors$().pipe(
      map((authors: Author[]) =>
        authors.find(({ id }: Author) => id === authorId)
      ),
      filter(Boolean),
      map(({ videos }: Author) => [...videos, video]),
      mergeMap((videos: Video[]) => this.patchAuthor$(authorId, { videos })),
      tap(() => {
        this.resetCachedData();
      })
    );
  }

  private updateVideoSameAuthor$(
    updatedVideo: Video,
    authorId: number
  ): Observable<Author> {
    return this.getAuthors$().pipe(
      map((authors: Author[]) =>
        authors.find(({ id }: Author) => id === authorId)
      ),
      filter(Boolean),
      map(({ videos }: Author) =>
        videos.reduce(
          (editedVideos, video) =>
            video.id === updatedVideo.id
              ? [...editedVideos, updatedVideo]
              : [...editedVideos, video],
          [] as Video[]
        )
      ),
      mergeMap((videos: Video[]) => this.patchAuthor$(authorId, { videos })),
      tap(() => {
        this.resetCachedData();
      })
    );
  }

  private updateVideoDifferentAuthor$(
    updatedVideo: Video,
    authorId: number,
    previousAuthorId: number
  ): Observable<Author> {
    return this.deleteVideo$(updatedVideo.id, previousAuthorId).pipe(
      concatMap(() => this.addVideo$(updatedVideo, authorId))
    );
  }

  private patchAuthor$(
    id: number,
    authorData: Partial<Author>
  ): Observable<Author> {
    return this.http.patch<Author>(`${API_AUTHORS}/${id}`, authorData);
  }

  private fetchCategories$(): Observable<Category[]> {
    return this.http.get<Category[]>(API_CATEGORIES);
  }

  private fetchAuthors$(): Observable<Author[]> {
    return this.http.get<Author[]>(API_AUTHORS);
  }

  private getCategoriesMap$(): Observable<CategoriesMap> {
    return this.getCategories$().pipe(
      map((categories: Category[]) =>
        categories.reduce(
          (categoriesMap, { id, name }) => ({ ...categoriesMap, [id]: name }),
          {}
        )
      )
    );
  }

  private resetCachedData(): void {
    this.authors = null;
    this.videos = null;
  }
}
