import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoleculeTableColComponent } from './molecule-table-col.component';

describe('MoleculeTableColComponent', () => {
  let component: MoleculeTableColComponent;
  let fixture: ComponentFixture<MoleculeTableColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoleculeTableColComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoleculeTableColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
