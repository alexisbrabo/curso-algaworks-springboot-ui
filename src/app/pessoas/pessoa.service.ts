import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  pesquisar(filtro: any): Observable<any> {
    // Deletar filtros que não foram preenchidos
    Object.keys(filtro).forEach(key => !filtro[key] ? delete filtro[key] : '');
    const params = new HttpParams({ fromObject: filtro });
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    return this.http.get(`${this.pessoasUrl}`, { headers, params });
  }

  listarTodas(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    });

    return this.http.get(`${this.pessoasUrl}`, { headers });
  }
}
