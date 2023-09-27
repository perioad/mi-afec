import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
  MatTableModule,
} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Category, ProcessedVideo } from '../../models/video.interfaces';
import { SearchComponent } from '../../../shared/components/search/search.component';
import {
  RELEASE_DATE_FORMAT,
  RELEASE_DATE_UNKNOWN,
  VIDEO_RESOLUTIONS,
} from '../../constants/video.constants';
import { DeleteVideoParams } from '../../models/video-table.interfaces';
import { DeleteVideoModalComponent } from '../delete-video-modal/delete-video-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { isNull } from 'lodash';
import { ThumbUpComponent } from '../../../cats/components/thumb-up/thumb-up.component';
import { enterLeaveSlideAnimation } from '../../../core/animations/enter-leave-slide.animation';
import { Direction } from '../../../core/constants/animations.constants';
import { isBetterResolution } from '../../utils/video.utils';
import { tableSorting } from '../../utils/video-table.utils';

@Component({
  selector: 'mi-video-table',
  templateUrl: './video-table.component.html',
  styleUrls: ['./video-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  animations: [enterLeaveSlideAnimation(Direction.Right)],
  imports: [
    CommonModule,
    SearchComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    DeleteVideoModalComponent,
    MatDialogModule,
    MatSortModule,
    ThumbUpComponent,
  ],
})
export class VideosTableComponent implements OnChanges, AfterViewInit {
  @Input({ required: true }) public videos: ProcessedVideo[] | null = null;

  @Output() public deleteVideo = new EventEmitter<DeleteVideoParams>();
  @Output() public editVideo = new EventEmitter<number>();

  public readonly releaseDateFormat = RELEASE_DATE_FORMAT;
  public readonly releaseDateUnknown = RELEASE_DATE_UNKNOWN;
  public readonly columns = [
    'name',
    'author',
    'categories',
    'bestFormatName',
    'releaseDate',
    'actions',
  ];

  public dataSource!: MatTableDataSource<
    ProcessedVideo,
    MatTableDataSourcePaginator
  >;
  public shouldShowEasterCat = false;

  private unfilteredVideos: ProcessedVideo[] = [];
  private videoToDelete: DeleteVideoParams | null = null;

  constructor(public dialog: MatDialog) {}

  @ViewChild(MatSort) private sort!: MatSort;

  public ngOnChanges(): void {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource();
      this.dataSource.sortData = tableSorting;
    }

    if (isNull(this.videos)) {
      return;
    }

    this.unfilteredVideos = this.videos;
    this.dataSource.data = this.videos;
  }

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public handleSearch(value: string): void {
    this.dataSource.data = !!value
      ? this.unfilteredVideos.filter(({ searchIndex }) =>
          searchIndex.includes(value)
        )
      : this.unfilteredVideos;
  }

  public handleDeleteVideo(videoId: number, authorId: number): void {
    this.videoToDelete = { videoId, authorId };
    this.openDialog();
  }

  public handleEditVideo(videoId: number) {
    this.editVideo.emit(videoId);
  }

  public getCategories(categories: Category[]): string {
    return categories.map(({ name }) => name).join(', ');
  }

  private openDialog(): void {
    this.dialog
      .open(DeleteVideoModalComponent)
      .afterClosed()
      .subscribe((isDeleteConfirmed: boolean) => {
        if (isDeleteConfirmed && this.videoToDelete) {
          this.deleteVideo.emit(this.videoToDelete);
        }

        this.videoToDelete = null;
        this.toggleEasterCat();
      });
  }

  private toggleEasterCat(): void {
    this.shouldShowEasterCat = !this.shouldShowEasterCat;
  }
}
