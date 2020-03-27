import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly accountService: AccountService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthorized = this.accountService.checkLogin();
    const onAnonymousRoute = state.url === '/login' || state.url === '/register';

    if (isAuthorized && onAnonymousRoute)
      this.router.navigate(['/']);

    if (!isAuthorized && !onAnonymousRoute) {
      this.accountService.returnUrl = state.url;
      this.router.navigate(['/login']);
    }

    return true;
  }
}
