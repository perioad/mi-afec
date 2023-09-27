import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { NavigationService } from '../../services/navigation/navigation.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mi-header',
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public isAddVideoDisplayed$ = this.navigationService.navigationEnd$.pipe(
    map((event: NavigationEnd) => event.urlAfterRedirects !== '/add-video')
  );

  constructor(private navigationService: NavigationService) {}
}
