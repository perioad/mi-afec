import { Component, EventEmitter, Output } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'mi-delete-video-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './delete-video-modal.component.html',
  styleUrls: ['./delete-video-modal.component.css'],
})
export class DeleteVideoModalComponent {}
