import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mi-cat-omg',
  standalone: true,
  templateUrl: './cat-omg.component.html',
  styleUrls: ['./cat-omg.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatOmgComponent {}
