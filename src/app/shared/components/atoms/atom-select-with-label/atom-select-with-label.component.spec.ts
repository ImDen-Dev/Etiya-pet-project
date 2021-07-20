import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomSelectWithLabelComponent } from './atom-select-with-label.component';

describe('AtomSelectWithLabelComponent', () => {
  let component: AtomSelectWithLabelComponent;
  let fixture: ComponentFixture<AtomSelectWithLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtomSelectWithLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtomSelectWithLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
