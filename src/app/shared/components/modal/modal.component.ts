import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'mi-modal',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input({ required: true }) public title!: string;
  @Input({ required: true }) public content!: string;
  @Input({ required: true }) public cancelButton!: string;
  @Input({ required: true }) public confirmButton!: string;
}
