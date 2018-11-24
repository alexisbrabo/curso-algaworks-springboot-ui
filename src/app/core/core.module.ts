import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/components/common/api';

import { PessoaService } from '../pessoas/pessoa.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    MessageService,
    ConfirmationService,
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    ErrorHandlerService
  ]
})
export class CoreModule { }
