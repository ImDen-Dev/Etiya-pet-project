import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'atom-spinner',
  template: ` <div
    style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(169, 169, 169, 0.3);"
  >
    <div
      style="position: absolute; top: 50%; left: 50%"
      class="spinner-border"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`,
})
export class SpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
