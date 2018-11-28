import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as moment from 'moment';

import { ErrorHandlerService } from '../core/error-handler.service';
import { Lancamento } from '../core/model';
import { MoneyHttp } from '../seguranca/money-http';

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

  constructor(private http: MoneyHttp, private errorHandler: ErrorHandlerService) { }

  pesquisar(filtro: any): Observable<any> {
    // Deletar filtros que não foram preenchidos e Converter os filtros do tipo Date para string aceita pela API
    Object.keys(filtro).forEach(key => !filtro[key] ? delete filtro[key] :
      key === 'dataVencimentoDe' || key === 'dataVencimentoAte' ? filtro[key] = moment(filtro[key]).format('YYYY-MM-DD') : '');
    const params = new HttpParams({ fromObject: filtro });

    return this.http.get(`${this.lancamentosUrl}?resumo`, { params }).pipe(catchError(this.errorHandler.handle));
  }

  excluir(codigo: number): Observable<any> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`).pipe(catchError(this.errorHandler.handle));
  }

  adicionar(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.post<any>(this.lancamentosUrl, lancamento).pipe(catchError(this.errorHandler.handle));
  }

  atualizar(lancamento: Lancamento): Observable<Lancamento> {
    return this.http.put<any>(`${this.lancamentosUrl}/${lancamento.codigo}`,
      lancamento).pipe(catchError(this.errorHandler.handle));
  }

  buscarPorCodigo(codigo: Number): Observable<Lancamento> {
    return this.http.get<any>(`${this.lancamentosUrl}/${codigo}`).pipe(catchError(this.errorHandler.handle));
  }

  converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }
}
