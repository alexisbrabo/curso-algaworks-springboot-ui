import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: string;
  dataVencimentoAte: string;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Observable<any> {
    Object.keys(filtro).forEach(key => !filtro[key] ? delete filtro[key] : '');
    const params = new HttpParams({ fromObject: filtro });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params });
  }
}
