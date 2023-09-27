import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoNotFoundComponent } from './video-not-found.component';

describe('VideoNotFoundComponent', () => {
  let component: VideoNotFoundComponent;
  let fixture: ComponentFixture<VideoNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VideoNotFoundComponent]
    });
    fixture = TestBed.createComponent(VideoNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
