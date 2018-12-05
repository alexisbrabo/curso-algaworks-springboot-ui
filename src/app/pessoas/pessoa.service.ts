import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../core/error-handler.service';
import { Pessoa } from '../core/model';
import { MoneyHttp } from '../seguranca/money-http';
import { environment } from './../../environments/environment';

export class PessoaFiltro {
  nome: string;
  page = 0; // pagina
  size = 5; // itens por pagina
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl: string;

  constructor(private http: MoneyHttp, private errorHandler: ErrorHandlerService) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filtro: any): Observable<any> {
    // Deletar filtros que não foram preenchidos
    Object.keys(filtro).forEach(key => !filtro[key] ? delete filtro[key] : '');
    const params = new HttpParams({ fromObject: filtro });
    return this.http.get(`${this.pessoasUrl}`, { params }).pipe(catchError(this.errorHandler.handle));
  }

  listarTodas(): Observable<any> {
    return this.http.get(`${this.pessoasUrl}`).pipe(catchError(this.errorHandler.handle));
  }

  excluir(codigo: number): Observable<any> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`).pipe(catchError(this.errorHandler.handle));
  }

  adicionar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<any>(this.pessoasUrl, pessoa).pipe(catchError(this.errorHandler.handle));
  }

  atualizar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<any>(`${this.pessoasUrl}/${pessoa.codigo}`,
      pessoa).pipe(catchError(this.errorHandler.handle));
  }

  mudarStatus(codigo: number, status: boolean): Observable<any> {
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`,
     status).pipe(catchError(this.errorHandler.handle));
  }

  buscarPorCodigo(codigo: Number): Observable<Pessoa> {
    return this.http.get<any>(`${this.pessoasUrl}/${codigo}`).pipe(catchError(this.errorHandler.handle));
  }
}
