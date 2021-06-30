import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-find-user',
  templateUrl: './find-user.component.html',
  styleUrls: ['./find-user.component.scss'],
})
export class FindUserComponent implements OnInit {
  findUserForm!: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder) {}

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
    this.userService.findUser(this.findUserForm.value);
  }
}
