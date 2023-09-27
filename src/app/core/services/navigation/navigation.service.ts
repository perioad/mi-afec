import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map, tap } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  public navigationEnd$: Observable<NavigationEnd>;

  private history: string[] = [];

  constructor(private router: Router, private location: Location) {
    this.navigationEnd$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => event as NavigationEnd)
    );

    this.navigationEnd$.subscribe((event: NavigationEnd) => {
      this.history.push(event.urlAfterRedirects);
    });
  }

  public goBack(): void {
    this.history.pop();

    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.goHome();
    }
  }

  public goHome(): void {
    this.router.navigate(['/home']);
  }

  public goEdit(id: number): void {
    this.router.navigate(['/edit-video', id]);
  }
}
