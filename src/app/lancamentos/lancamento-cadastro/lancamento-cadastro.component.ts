import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AppComponent } from 'src/app/app.component';
import { Lancamento } from 'src/app/core/model';

import { LancamentoService } from '../lancamento.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';

import { CategoriaService } from 'src/app/categorias/categoria.service';
import { MessageService } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';

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
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private app: AppComponent,
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private pessoaService: PessoaService,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }
    this.pt = this.app.pt;
    this.carregarCategorias();
    this.carregarPessoas();
    this.title.setTitle('Novo Lançamento');
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo).subscribe(lancamento => {
      this.lancamentoService.converterStringsParaDatas([lancamento]);
      this.lancamento = lancamento;
      this.atualizarTituloEdicao();
    },
      error => {
        this.messageService.add({ severity: 'error', detail: error });
      });
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.lancamento).subscribe(lancamentoAdicionado => {
      this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    },
      error => {
        this.messageService.add({ severity: 'error', detail: error });
      });
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.lancamento).subscribe(lancamento => {
      this.messageService.add({ severity: 'success', detail: 'Lançamento atualizado com sucesso!' });

      this.lancamentoService.converterStringsParaDatas([lancamento]);
      this.lancamento = lancamento;
      this.atualizarTituloEdicao();
    },
      error => {
        this.messageService.add({ severity: 'error', detail: error });
      });
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas().subscribe(categorias => {
      this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
    },
      error => {
        this.messageService.add({ severity: 'error', detail: error });
      });
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas().subscribe(pessoas => {
      this.pessoas = pessoas.content.map(c => ({ label: c.nome, value: c.codigo }));
    },
      error => {
        this.messageService.add({ severity: 'error', detail: error });
      });
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function () {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Lançamento: ${this.lancamento.descricao}`);
  }

}
