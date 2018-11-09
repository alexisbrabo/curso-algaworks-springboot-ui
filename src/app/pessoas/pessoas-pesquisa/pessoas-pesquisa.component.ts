import { Component, OnInit } from '@angular/core';
import { PessoaService, PessoaFiltro } from '../pessoa.service';

import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css'],
  preserveWhitespaces: true
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = Array<any>();
  filtro = new PessoaFiltro();
  totalRegistros = 0;

  constructor(private pessoaService: PessoaService, private messageService: MessageService) { }

  ngOnInit() { }

  pesquisar(pagina) {
    this.filtro.page = pagina;

    this.pessoaService.pesquisar(this.filtro).subscribe(response => {
      const pessoas = response.content;

      const resultado = {
        pessoas,
        total: response.totalElements
      };
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
    },
      error => {
        this.messageService.add({ severity: 'error', detail: error });
      });
  }
}
