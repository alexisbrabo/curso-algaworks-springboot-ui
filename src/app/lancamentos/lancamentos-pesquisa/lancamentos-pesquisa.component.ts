import { Component, OnInit } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { AppComponent } from 'src/app/app.component';
import * as moment from 'moment';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  preserveWhitespaces: true
})
export class LancamentosPesquisaComponent implements OnInit {
  lancamentos = Array<any>();
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pt: any;


  constructor(private lancamentoService: LancamentoService, private app: AppComponent) {

  }

  ngOnInit() {
    this.pt = this.app.pt;
    this.pesquisar();
  }

  pesquisar() {
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoDe: this.dataVencimentoInicio ? moment(this.dataVencimentoInicio).format('YYYY-MM-DD') : null,
      dataVencimentoAte: this.dataVencimentoFim ? moment(this.dataVencimentoFim).format('YYYY-MM-DD') : null
    };

    this.lancamentoService.pesquisar(filtro).subscribe(response => this.lancamentos = response.content);
  }

}
