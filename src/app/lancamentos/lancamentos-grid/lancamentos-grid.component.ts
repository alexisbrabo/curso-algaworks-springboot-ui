import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/components/common/api';
import { LancamentosPesquisaComponent } from '../lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoService } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent {

  @Input() lancamentos = [];
  @Input() filtro;
  @Input() totalRegistros;
  @ViewChild('tabela') grid;

  constructor(private lancamentoPesquisa: LancamentosPesquisaComponent, private lancamentoService: LancamentoService,
     private messageService: MessageService) { }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.lancamentoPesquisa.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo).subscribe(response => {
      this.lancamentoPesquisa.pesquisar(0);
      this.grid.first = 0;
      this.messageService.add({severity: 'success', detail: 'Lançamento excluído com sucesso'});
    });
  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
}

}
