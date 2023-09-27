import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatOmgComponent } from './cat-omg.component';

describe('CatOmgComponent', () => {
  let component: CatOmgComponent;
  let fixture: ComponentFixture<CatOmgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CatOmgComponent]
    });
    fixture = TestBed.createComponent(CatOmgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
