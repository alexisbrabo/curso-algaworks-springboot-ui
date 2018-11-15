import { Component, Input, ViewChild } from '@angular/core';
import { PessoasPesquisaComponent } from '../pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaService } from '../pessoa.service';

import { LazyLoadEvent, ConfirmationService, MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {

  @Input() pessoas = [];
  @Input() filtro;
  @Input() totalRegistros;
  @ViewChild('tabela') grid;

  constructor(private pessoasPesquisa: PessoasPesquisaComponent, private confirmation: ConfirmationService,
     private pessoaService: PessoaService, private messageService: MessageService) { }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pessoasPesquisa.pesquisar(pagina);
  }

  atualizarStatusAtivo(pessoa: any) {
    this.pessoaService.mudarStatus(pessoa.codigo, pessoa.ativo ? false : true).subscribe(response => {
      this.pessoasPesquisa.pesquisar(0);
      this.grid.first = 0;
      this.messageService.add({ severity: 'success', detail: 'Status da pessoa atualizado com sucesso' });
    },
      error => {
        this.messageService.add({ severity: 'error', detail: error });
      });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo).subscribe(response => {
      this.pessoasPesquisa.pesquisar(0);
      this.grid.first = 0;
      this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso' });
    },
      error => {
        this.messageService.add({ severity: 'error', detail: error });
      });
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      header: 'Confirmar Exclusão',
      message: 'Tem certeza que deseja excluir?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }
}
