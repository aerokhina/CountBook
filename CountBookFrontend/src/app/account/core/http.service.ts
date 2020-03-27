import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  post<T = any>(url: string, body: any | null): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, body, {
      withCredentials: false
    });
  }
}
