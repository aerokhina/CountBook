import {Injectable} from '@angular/core';

const tokenKey = "authorizationToken";

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  getToken(): string {
    return localStorage.getItem(tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(tokenKey);
  }
}
