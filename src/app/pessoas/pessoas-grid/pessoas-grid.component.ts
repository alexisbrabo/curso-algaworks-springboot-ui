import { Component, OnInit, Input } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { PessoasPesquisaComponent } from '../pessoas-pesquisa/pessoas-pesquisa.component';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

@Input() pessoas = [];
@Input() filtro;
@Input() totalRegistros;

constructor(private pessoasPesquisa: PessoasPesquisaComponent) {}

aoMudarPagina(event: LazyLoadEvent) {
  const pagina = event.first / event.rows;
  this.pessoasPesquisa.pesquisar(pagina);
}
}
