import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mi-cat-hearts',
  standalone: true,
  templateUrl: './cat-hearts.component.html',
  styleUrls: ['./cat-hearts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatHeartsComponent {}
