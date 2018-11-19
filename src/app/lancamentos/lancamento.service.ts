import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as moment from 'moment';

import { ErrorHandlerService } from '../core/error-handler.service';
import { Lancamento } from '../core/model';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
  page = 0; // pagina
  size = 5; // itens por pagina
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  pesquisar(filtro: any): Observable<any> {
    // Deletar filtros que não foram preenchidos e Converter os filtros do tipo Date para string aceita pela API
    Object.keys(filtro).forEach(key => !filtro[key] ? delete filtro[key] :
      key === 'dataVencimentoDe' || key === 'dataVencimentoAte' ? filtro[key] = moment(filtro[key]).format('YYYY-MM-DD') : '');
    const params = new HttpParams({ fromObject: filtro });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params }).pipe(catchError(this.errorHandler.handle));
  }

  excluir(codigo: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers }).pipe(catchError(this.errorHandler.handle));
  }

  adicionar(lancamento: Lancamento): Observable<Lancamento> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    return this.http.post<any>(this.lancamentosUrl, lancamento, { headers }).pipe(catchError(this.errorHandler.handle));
  }

}
