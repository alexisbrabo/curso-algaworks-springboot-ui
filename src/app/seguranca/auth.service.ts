import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from '../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  login(usuario: string, senha: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization' : 'Basic YW5ndWxhcjpAbmd1bEByMA==',
      'Content-Type' : 'application/x-www-form-urlencoded'
    });

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<any>(this.oauthTokenUrl, body, { headers }).pipe(catchError(this.errorHandler.handle));
  }
}
