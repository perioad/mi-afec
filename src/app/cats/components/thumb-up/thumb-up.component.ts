import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mi-thumb-up',
  standalone: true,
  templateUrl: './thumb-up.component.html',
  styleUrls: ['./thumb-up.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThumbUpComponent {}
