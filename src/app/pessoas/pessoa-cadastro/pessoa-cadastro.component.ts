import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { PessoaService } from '../pessoa.service';

import { Pessoa } from 'src/app/core/model';

import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css'],
  preserveWhitespaces: true
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService, private messageService: MessageService) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa).subscribe(() => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });

      form.reset();
      this.pessoa = new Pessoa();
    },
      error => {
        this.messageService.add({ severity: 'error', detail: error });
      });
  }

}
