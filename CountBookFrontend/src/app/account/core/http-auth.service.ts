import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {AuthTokenService} from "./auth-token.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpAuthService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authTokenService: AuthTokenService) { }

  post<T>(url: string, body: any | null): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, body, this.createOptions());
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url, this.createOptions());
  }

  private createOptions()
  {
    return {
      headers: {
        ['Authorization']: `Bearer ${this.authTokenService.getToken()}`
      }
    }
  }
}
