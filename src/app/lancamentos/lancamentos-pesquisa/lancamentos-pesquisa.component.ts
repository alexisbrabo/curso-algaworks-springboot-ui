import { Component, OnInit } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { AppComponent } from 'src/app/app.component';
import { MessageService } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';

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


  constructor(
    private lancamentoService: LancamentoService,
     private app: AppComponent,
    private messageService: MessageService,
    private title: Title
    ) {

  }

  ngOnInit() {
    this.pt = this.app.pt;
    this.title.setTitle('Pesquisa de Lançamentos');
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
    }, error => {
      this.messageService.add({ severity: 'error', detail: error });
    });
  }

}
