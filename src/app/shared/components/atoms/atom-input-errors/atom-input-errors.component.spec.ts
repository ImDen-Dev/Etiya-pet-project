import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomInputErrorsComponent } from './atom-input-errors.component';

describe('AtomInputErrorsComponent', () => {
  let component: AtomInputErrorsComponent;
  let fixture: ComponentFixture<AtomInputErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtomInputErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtomInputErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
