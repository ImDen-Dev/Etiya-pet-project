import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { FindUsersAction, GetUsersAction } from '../users-state/users.actions';

@Component({
  selector: 'app-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.scss'],
})
export class FindUserComponent implements OnInit {
  findUserForm!: FormGroup;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initFindUserForm();
  }

  initFindUserForm() {
    this.findUserForm = this.fb.group({
      firstName: [null],
      lastName: [null],
      userName: [null],
      email: [null],
      phone: [null],
    });
  }

  onSubmit() {
    this.store.dispatch(new FindUsersAction(this.findUserForm.value));
  }
}
