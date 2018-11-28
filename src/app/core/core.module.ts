import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/components/common/api';

import { PessoaService } from '../pessoas/pessoa.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { AuthService } from '../seguranca/auth.service';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

import { JwtHelperService } from '@auth0/angular-jwt';
import { MoneyHttp } from '../seguranca/money-http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../seguranca/token-interceptor';

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
    AuthService,
    MessageService,
    ConfirmationService,
    JwtHelperService,
    MoneyHttp,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    ErrorHandlerService
  ]
})
export class CoreModule { }
