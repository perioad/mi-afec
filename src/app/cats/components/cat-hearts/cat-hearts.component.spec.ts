import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatHeartsComponent } from './cat-hearts.component';

describe('CatHeartsComponent', () => {
  let component: CatHeartsComponent;
  let fixture: ComponentFixture<CatHeartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatHeartsComponent]
    });
    fixture = TestBed.createComponent(CatHeartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
