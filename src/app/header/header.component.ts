import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated!: boolean;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuth.subscribe(
      (isAuth) => (this.isAuthenticated = isAuth)
    );
  }

  onLogout() {
    this.authService.logout();
  }
}
