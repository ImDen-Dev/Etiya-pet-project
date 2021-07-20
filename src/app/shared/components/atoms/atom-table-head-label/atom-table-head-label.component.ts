import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'atom-table-head-label',
  templateUrl: './atom-table-head-label.component.html',
  styleUrls: ['./atom-table-head-label.component.scss'],
})
export class AtomTableHeadLabelComponent {
  @Input() sortBy!: string;
  @Input() sortOrder!: string;
  @Input() text!: string;
  @Input() controlName!: string;
  @Input() isSortable = true;
  constructor() {}
}
