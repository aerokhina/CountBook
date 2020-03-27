import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {AuthTokenService} from "./core/auth-token.service";
import {HttpService} from "./core/http.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public returnUrl: string = null;

  constructor(private http: HttpService, private readonly router: Router, private authTokenService: AuthTokenService) {
  }

  login(email: string, password: string) {
    return this.http.post<TokenResult>(
      "user/login",
      {
        email: email,
        password: password
      }).pipe(
      tap(result => {
        this.authTokenService.setToken(result.authenticationToken);
        this.router.navigate(this.returnUrl ? [this.returnUrl] : ['/']);
      }),
    );
  }

  checkLogin() {
    return Boolean(this.authTokenService.getToken());
  }

  logout() {
    this.authTokenService.removeToken();
    this.router.navigate(["/", "login"]);
  }

  register(name: string, email: string, password: string) {
    return this.http.post("user/register",
      {
        email: email,
        name: name,
        password: password
      }).pipe(
      tap(result => {
        this.router.navigate(["/", "login"])
      })
    )
  }
}

interface TokenResult {
  authenticationToken: string;
}
