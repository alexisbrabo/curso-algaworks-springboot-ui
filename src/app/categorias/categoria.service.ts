import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../core/error-handler.service';
import { MoneyHttp } from '../seguranca/money-http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: MoneyHttp, private errorHandler: ErrorHandlerService) { }

  listarTodas(): Observable<any> {
    return this.http.get(`${this.categoriasUrl}`).pipe(catchError(this.errorHandler.handle));
  }
}
