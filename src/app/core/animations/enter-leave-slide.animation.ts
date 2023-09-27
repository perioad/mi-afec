import { trigger, transition, style, animate } from '@angular/animations';
import { Direction } from '../constants/animations.constants';

export const enterLeaveSlideAnimation = (direction: Direction) =>
  trigger('enterLeaveSlideAnimation', [
    transition(':enter', [
      style({ [direction]: '-500px' }),
      animate('500ms', style({ [direction]: '0px' })),
    ]),
    transition(':leave', [animate('500ms', style({ [direction]: '-500px' }))]),
  ]);
