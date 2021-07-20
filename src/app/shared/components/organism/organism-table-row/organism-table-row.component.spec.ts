import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganismTableRowComponent } from './organism-table-row.component';

describe('AorganismTableRowComponent', () => {
  let component: OrganismTableRowComponent;
  let fixture: ComponentFixture<OrganismTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganismTableRowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganismTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
