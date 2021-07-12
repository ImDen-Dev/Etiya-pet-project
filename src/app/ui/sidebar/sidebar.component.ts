import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Select } from '@ngxs/store';
import { AuthState } from '../../auth/auth-state/auth.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor(public authService: AuthService) {}

  @Select(AuthState.isAuth) isAuth$!: Observable<boolean>;
  ngOnInit(): void {}
}
