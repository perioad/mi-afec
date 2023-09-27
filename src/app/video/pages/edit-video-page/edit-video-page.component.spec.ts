import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVideoPageComponent } from './edit-video-page.component';

describe('EditVideoPageComponent', () => {
  let component: EditVideoPageComponent;
  let fixture: ComponentFixture<EditVideoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditVideoPageComponent],
    });
    fixture = TestBed.createComponent(EditVideoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
