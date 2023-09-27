import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FAQ } from '../../models/faq.interfaces';
import { CatHeartsComponent } from '../../../cats/components/cat-hearts/cat-hearts.component';
import { enterLeaveSlideAnimation } from '../../../core/animations/enter-leave-slide.animation';
import { Direction } from '../../../core/constants/animations.constants';

@Component({
  selector: 'mi-faq-page',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, CatHeartsComponent],
  animations: [enterLeaveSlideAnimation(Direction.Bottom)],
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqPageComponent {
  public readonly faq: FAQ[] = [
    {
      question: 'How do I add videos?',
      answer:
        "To add a video, simply navigate to the \"Add Video\" section in the menu. Upload your video file, provide a title, and enter the author's name. Click 'Submit' and voilà! Your video is now in the system.",
    },
    {
      question: 'Can I edit videos after uploading them?',
      answer:
        'Absolutely! Go to the "Edit Video" page, locate the video you want to modify, and click on the edit icon. You can then update the title or author\'s name as needed. Don\'t forget to save your changes!',
    },
    {
      question: 'What if I want to remove a video from the system?',
      answer:
        'No problem! Head over to the "Delete Video" section, find the video you want to remove, and click the delete button. Confirm your action, and the video will be deleted.',
    },
    {
      question:
        "Is there a way to view all the videos I've uploaded in one place?",
      answer:
        'Certainly! Go to the "View All Videos" page. Here, you\'ll see a table displaying all your uploaded videos with their respective titles and authors.',
    },
    {
      question: 'How can I sort videos by name or author?',
      answer:
        'It\'s easy! On the "View All Videos" page, simply click on the column headers labeled "Name" or "Author." Click once to sort in ascending order, and click again to sort in descending order.',
    },
    {
      question: 'Can I search for specific videos?',
      answer:
        'You sure can! At the top-right corner of the "View All Videos" page, you\'ll find a search bar. Enter keywords related to the video you\'re looking for, and the system will filter the results accordingly.',
    },
    {
      question: 'Are there any hidden surprises in the application?',
      answer:
        "Indeed! We've hidden three easter cats somewhere within the application. Keep your eyes peeled and explore different sections to find them. They're sure to bring a smile to your face!",
    },
  ];

  public shouldShowEasterCat = false;

  public toggleEasterCat(): void {
    this.shouldShowEasterCat = !this.shouldShowEasterCat;
  }
}
