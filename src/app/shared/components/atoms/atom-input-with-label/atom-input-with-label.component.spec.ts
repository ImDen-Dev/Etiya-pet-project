import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomInputWithLabelComponent } from './atom-input-with-label.component';

describe('AtomComponent', () => {
  let component: AtomInputWithLabelComponent;
  let fixture: ComponentFixture<AtomInputWithLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtomInputWithLabelComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtomInputWithLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
