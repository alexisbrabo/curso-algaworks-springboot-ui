import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { MoneyHttp } from './money-http';
import { ErrorHandlerService } from '../core/error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeUrl: string;

  constructor(
    private http: MoneyHttp,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService
  ) {
    this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
   }

  logout(): Observable<any> {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true }).pipe(catchError(this.errorHandler.handle));
  }
}
