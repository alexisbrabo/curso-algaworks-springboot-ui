import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { AppComponent } from 'src/app/app.component';
import { Lancamento } from 'src/app/core/model';

import { LancamentoService } from '../lancamento.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';

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
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private app: AppComponent,
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private pessoaService: PessoaService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }
    this.pt = this.app.pt;
    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo).subscribe(lancamento => {
      this.lancamentoService.converterStringsParaDatas([lancamento]);
      this.lancamento = lancamento;
    },
      error => {
        this.messageService.add({ severity: 'error', detail: error });
      });
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento).subscribe(() => {
      this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

      form.reset();
      this.lancamento = new Lancamento();
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

}
