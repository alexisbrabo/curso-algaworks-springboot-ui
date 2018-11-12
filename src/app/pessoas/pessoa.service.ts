import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../core/error-handler.service';

export class PessoaFiltro {
  nome: string;
  page = 0; // pagina
  size = 5; // itens por pagina
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }

  pesquisar(filtro: any): Observable<any> {
    // Deletar filtros que não foram preenchidos
    Object.keys(filtro).forEach(key => !filtro[key] ? delete filtro[key] : '');
    const params = new HttpParams({ fromObject: filtro });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    return this.http.get(`${this.pessoasUrl}`, { headers, params }).pipe(catchError(this.errorHandler.handle));
  }

  listarTodas(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    return this.http.get(`${this.pessoasUrl}`, { headers }).pipe(catchError(this.errorHandler.handle));
  }

  excluir(codigo: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers }).pipe(catchError(this.errorHandler.handle));
  }

  mudarStatus(codigo: number, status: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`,
     status, { headers }).pipe(catchError(this.errorHandler.handle));
  }
}
