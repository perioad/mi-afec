import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbUpComponent } from './thumb-up.component';

describe('ThumbUpComponent', () => {
  let component: ThumbUpComponent;
  let fixture: ComponentFixture<ThumbUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThumbUpComponent]
    });
    fixture = TestBed.createComponent(ThumbUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
