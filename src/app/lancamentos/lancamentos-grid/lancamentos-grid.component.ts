import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/components/common/api';
import { LancamentosPesquisaComponent } from '../lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoService } from '../lancamento.service';
import { AuthService } from 'src/app/seguranca/auth.service';

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

  constructor(
    private lancamentoPesquisa: LancamentosPesquisaComponent,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private auth: AuthService
  ) { }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.lancamentoPesquisa.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo).subscribe(response => {
      this.lancamentoPesquisa.pesquisar(0);
      this.grid.first = 0;
      this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso' });
    },
      error => {
        this.messageService.add({ severity: 'error', detail: error });
      });
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      header: 'Confirmar Exclusão',
      message: 'Tem certeza que deseja excluir?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

}
