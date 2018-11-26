import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PessoaService } from '../pessoa.service';

import { Pessoa } from 'src/app/core/model';

import { MessageService } from 'primeng/components/common/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css'],
  preserveWhitespaces: true
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoPessoa = this.route.snapshot.params['codigo'];
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
    this.title.setTitle('Nova Pessoa');
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa();
    }
  }

  adicionarPessoa() {
    this.pessoaService.adicionar(this.pessoa).subscribe(pessoaAdicionada => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });

      this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
    },
      error => {
        this.messageService.add({ severity: 'error', detail: error });
      });
  }

  atualizarPessoa() {
    this.pessoaService.atualizar(this.pessoa).subscribe(pessoa => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa atualizada com sucesso!' });

      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    },
      error => {
        this.messageService.add({ severity: 'error', detail: error });
      });
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo).subscribe(pessoa => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    },
      error => {
        this.messageService.add({ severity: 'error', detail: error });
      });
  }

  nova(form: FormControl) {
    form.reset();

    this.pessoa = new Pessoa();

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Pessoa: ${this.pessoa.nome}`);
  }

}
