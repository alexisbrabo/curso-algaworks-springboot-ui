import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
  preserveWhitespaces: true
})
export class LancamentoCadastroComponent implements OnInit {

  pt: any;
  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];
  categorias = [];
  pessoas = [
    { label: 'João da Silva', value: 1 },
    { label: 'Sebastião Souza', value: 2 },
    { label: 'MAria Augusta', value: 3 }
  ];

  constructor(private app: AppComponent, private categoriaService: CategoriaService, private messageService: MessageService) { }

  ngOnInit() {
    this.pt = this.app.pt;
    this.carregarCategorias();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas().subscribe(categorias => {
      this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo}));
    },
    error => {
      this.messageService.add({ severity: 'error', detail: error });
    });
  }

}
