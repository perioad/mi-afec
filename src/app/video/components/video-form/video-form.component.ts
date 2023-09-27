import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NavigationService } from '../../../core/services/navigation/navigation.service';
import { VideoForm } from '../../models/video-form.interfaces';
import {
  Author,
  Category,
  ProcessedVideo,
} from '../../models/video.interfaces';
import { CatOmgComponent } from '../../../cats/components/cat-omg/cat-omg.component';
import { enterLeaveSlideAnimation } from '../../../core/animations/enter-leave-slide.animation';
import { Direction } from '../../../core/constants/animations.constants';

@Component({
  selector: 'mi-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [enterLeaveSlideAnimation(Direction.Left)],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    CatOmgComponent,
  ],
})
export class VideoFormComponent implements OnInit {
  @Input({ required: true }) public title = '';
  @Input({ required: true }) public authors: Author[] = [];
  @Input({ required: true }) public categories: Category[] = [];
  @Input() public video: ProcessedVideo | null = null;

  @Output() public submitted = new EventEmitter<VideoForm>();

  public videoForm!: FormGroup;
  public shouldShowEasterCat = false;

  constructor(
    private fb: FormBuilder,
    private navigationService: NavigationService
  ) {}

  public get isSubmitDisabled(): boolean {
    return this.videoForm.invalid || this.videoForm.pristine;
  }

  private get initialName(): string {
    return this.video?.name || '';
  }

  private get initialAuthorId(): number | null {
    return this.video?.author.id || null;
  }

  private get initialCategoriesIds(): number[] | null {
    return this.video?.categories.map(({ id }: Category) => id) || null;
  }

  public ngOnInit(): void {
    this.videoForm = this.fb.nonNullable.group({
      name: [this.initialName, Validators.required],
      authorId: [this.initialAuthorId, Validators.required],
      categoriesIds: [this.initialCategoriesIds, Validators.required],
    });
  }

  public submit(): void {
    if (!this.isSubmitDisabled) {
      this.submitted.emit(this.videoForm.getRawValue());
    }
  }

  public cancel(): void {
    this.navigationService.goBack();
  }
}
