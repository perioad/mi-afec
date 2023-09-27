import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoFormComponent } from '../../components/video-form/video-form.component';
import { VideoApiService } from '../../services/video-api/video-api.service';
import { VideoForm } from '../../models/video-form.interfaces';
import { NavigationService } from '../../../core/services/navigation/navigation.service';
import { VideoNotFoundComponent } from '../../components/video-not-found/video-not-found.component';
import { Observable } from 'rxjs';
import {
  Author,
  Category,
  ProcessedVideo,
} from '../../models/video.interfaces';

@Component({
  selector: 'mi-edit-video-page',
  standalone: true,
  imports: [CommonModule, VideoFormComponent, VideoNotFoundComponent],
  templateUrl: './edit-video-page.component.html',
  styleUrls: ['./edit-video-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditVideoPageComponent implements OnInit {
  @Input()
  set id(videoId: string) {
    this.videoId = Number(videoId);
  }

  public videoId!: number;
  public authors$!: Observable<Author[]>;
  public categories$!: Observable<Category[]>;
  public video$!: Observable<ProcessedVideo | undefined>;

  constructor(
    private videoApiService: VideoApiService,
    private navigationService: NavigationService
  ) {}

  public getTitle(videoName: string): string {
    return `Edit video: ${videoName}`;
  }

  public ngOnInit(): void {
    this.authors$ = this.videoApiService.getAuthors$();
    this.categories$ = this.videoApiService.getCategories$();
    this.video$ = this.videoApiService.getVideo$(this.videoId);
  }

  public editVideo(videoForm: VideoForm, video: ProcessedVideo): void {
    this.videoApiService.editVideo$(videoForm, video).subscribe({
      next: () => {
        this.navigationService.goHome();
      },
    });
  }
}
