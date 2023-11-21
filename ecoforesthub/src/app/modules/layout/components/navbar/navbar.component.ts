import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;

  constructor(private AuthService: AuthService, private router: Router) {}
  logout() {
    this.AuthService.logout();
    this.router.navigate(['/login']);
  }
}
