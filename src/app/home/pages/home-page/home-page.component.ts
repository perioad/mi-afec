import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { VideosTableComponent } from '../../../video/components/video-table/video-table.component';
import { Observable } from 'rxjs';
import { NavigationService } from '../../../core/services/navigation/navigation.service';
import { ProcessedVideo } from '../../../video/models/video.interfaces';
import { VideoApiService } from '../../../video/services/video-api/video-api.service';
import { CommonModule } from '@angular/common';
import { DeleteVideoParams } from '../../../video/models/video-table.interfaces';

@Component({
  selector: 'mi-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, VideosTableComponent],
})
export class HomePageComponent {
  public videos$!: Observable<ProcessedVideo[]>;

  constructor(
    private videoApiService: VideoApiService,
    private cdRef: ChangeDetectorRef,
    private navigationService: NavigationService
  ) {}

  public ngOnInit(): void {
    this.videos$ = this.videoApiService.getVideos$();
  }

  public deleteVideo({ videoId, authorId }: DeleteVideoParams): void {
    this.videoApiService.deleteVideo$(videoId, authorId).subscribe(() => {
      this.videos$ = this.videoApiService.getVideos$();
      this.cdRef.detectChanges();
    });
  }

  public editVideo(id: number) {
    this.navigationService.goEdit(id);
  }
}
