import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

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

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Observable<any> {
    // Deletar filtros que não foram preenchidos e Converter os filtros do tipo Date para string aceita pela API
    Object.keys(filtro).forEach(key => !filtro[key] ? delete filtro[key] :
      key === 'dataVencimentoDe' || key === 'dataVencimentoAte' ? filtro[key] = moment(filtro[key]).format('YYYY-MM-DD') : '');
    const params = new HttpParams({ fromObject: filtro });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params });
  }
}
