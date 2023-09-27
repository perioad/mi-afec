import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'mi-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() public searchTriggered = new EventEmitter<string>();

  public searchControl = new FormControl('', { nonNullable: true });

  private readonly subscribtions = new Subscription();

  public ngOnInit(): void {
    const searchSubscription = this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((rawValue: string) => {
        const value = rawValue.trim().toLowerCase();

        this.searchTriggered.emit(value);
      });

    this.subscribtions.add(searchSubscription);
  }

  public ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }
}
