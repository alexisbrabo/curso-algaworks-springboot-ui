import { Component, OnInit } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  preserveWhitespaces: true
})
export class LancamentosPesquisaComponent implements OnInit {
  lancamentos = Array<any>();
  filtro = new LancamentoFiltro();
  totalRegistros = 0;
  pt: any;


  constructor(private lancamentoService: LancamentoService, private app: AppComponent) {

  }

  ngOnInit() {
    this.pt = this.app.pt;
  }

  pesquisar(pagina) {
    this.filtro.page = pagina;

    this.lancamentoService.pesquisar(this.filtro).subscribe(response => {
      const lancamentos = response.content;

      const resultado = {
        lancamentos,
        total: response.totalElements
      };
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
    });
  }

}
