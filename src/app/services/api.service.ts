import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Video } from './../interfaces/video.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private BASE_URL: string = 'http://127.0.0.1:8000/api/';

  private getHeaders(token?: string | null): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (token) {
      headers = headers.set('Authorization', `Token ${token}`);
    }
    return headers;
  }

  post<T>(postData: any, url: string, token?: string | null): Observable<T> {
    const headers = this.getHeaders(token);
    return this.http
      .post<T>(`${this.BASE_URL}${url}`, postData, { headers })
      .pipe(catchError((error) => throwError(() => error)));
  }

  get<T>(url: string, token?: string | null): Observable<T> {
    const headers = this.getHeaders(token);
    return this.http
      .get<T>(`${this.BASE_URL}${url}`, { headers })
      .pipe(catchError((error) => throwError(() => error)));
  }
}
