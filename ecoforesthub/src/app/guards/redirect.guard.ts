import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { TokenService } from '@auth/token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}
  canActivate(): boolean {
    const token = this.tokenService.getToken();
    if (token) {
      this.router.navigate(['/login']);
    }
    return true;
  }
}
