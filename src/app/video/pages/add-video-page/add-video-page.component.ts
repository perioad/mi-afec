import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoFormComponent } from '../../components/video-form/video-form.component';
import { VideoApiService } from '../../services/video-api/video-api.service';
import { VideoForm } from '../../models/video-form.interfaces';
import { NavigationService } from '../../../core/services/navigation/navigation.service';

@Component({
  selector: 'mi-add-video-page',
  standalone: true,
  imports: [CommonModule, VideoFormComponent],
  templateUrl: './add-video-page.component.html',
  styleUrls: ['./add-video-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddVideoPageComponent {
  public authors$ = this.videoApiService.getAuthors$();
  public categories$ = this.videoApiService.getCategories$();

  constructor(
    private videoApiService: VideoApiService,
    private navigationService: NavigationService
  ) {}

  public addVideo(videoForm: VideoForm): void {
    this.videoApiService.addNewVideo$(videoForm).subscribe(() => {
      this.navigationService.goHome();
    });
  }
}
