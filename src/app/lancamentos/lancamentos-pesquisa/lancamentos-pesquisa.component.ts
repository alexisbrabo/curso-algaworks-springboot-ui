import { Component, OnInit } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  preserveWhitespaces: true
})
export class LancamentosPesquisaComponent implements OnInit {
  lancamentos = Array<any>();
  descricao = '';
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;


  constructor(private lancamentoService: LancamentoService) {

  }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoDe: this.dataVencimentoInicio,
      dataVencimentoAte: this.dataVencimentoFim
    };

    this.lancamentoService.pesquisar(filtro).subscribe(response => this.lancamentos = response.content);
  }

}
