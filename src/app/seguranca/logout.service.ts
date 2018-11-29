import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { MoneyHttp } from './money-http';
import { ErrorHandlerService } from '../core/error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeUrl = 'http://localhost:8080/tokens/revoke';

  constructor(
    private http: MoneyHttp,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService
  ) { }

  logout(): Observable<any> {
    return this.http.delete(this.tokensRevokeUrl, { withCredentials: true }).pipe(catchError(this.errorHandler.handle));
  }
}
