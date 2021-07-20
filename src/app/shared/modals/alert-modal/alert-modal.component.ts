import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  DeleteUserAction,
  DeleteUserAddressAction,
  UpdateUserAction,
} from '../../states/users-table-state/users-table.actions';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent implements OnInit {
  @Output() delete = new EventEmitter<boolean>();
  @Input() isAddress = false;
  constructor(private store: Store) {}

  ngOnInit(): void {}

  onCancel() {
    this.delete.emit(false);
    this.isAddress = false;
  }

  onDelete() {
    if (this.isAddress) {
      this.store.dispatch(new DeleteUserAddressAction());
      this.onCancel();
      return;
    }
    this.store.dispatch(new DeleteUserAction());
    this.onCancel();
  }
}
