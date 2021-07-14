import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { SetRequestAction } from '../../shared/states/search-state/search.actions';
import { SearchState } from '../../shared/states/search-state/search.state';
import { Observable } from 'rxjs';
import { UserInfoModel } from '../../shared/models/user-info.model';

@Component({
  selector: 'app-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.scss'],
})
export class FindUserComponent implements OnInit {
  findUserForm!: FormGroup;
  users: UserInfoModel[] = [];

  @Select(SearchState.getUsers) users$!: Observable<UserInfoModel[]>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initFindUserForm();
    this.users$.subscribe((users) => (this.users = users));
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
    this.store.dispatch(new SetRequestAction(this.findUserForm.value));
  }
}
