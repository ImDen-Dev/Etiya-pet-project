import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get getLoginForm() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      (resp) => {
        console.log(resp);
        if (resp.length > 0) {
          this.authService.setUser(resp[0]);
          this.authService.isAuth.next(true);
          this.router.navigate(['user-info']);
        } else {
          this.router.navigate(['sign-up']);
        }
      },
      (error) => console.log(error)
    );
  }
}
