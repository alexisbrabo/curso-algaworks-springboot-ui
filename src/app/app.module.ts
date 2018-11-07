import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { LancamentoService } from './lancamentos/lancamento.service';
import { HttpClientModule } from '@angular/common/http';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';

import { MessageService, ConfirmationService } from 'primeng/components/common/api';
import { PessoaService } from './pessoas/pessoa.service';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LancamentosModule,
    PessoasModule,
    CoreModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
