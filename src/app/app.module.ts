import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { LancamentoService } from './lancamentos/lancamento.service';
import { HttpClientModule } from '@angular/common/http';

import { MessageService, ConfirmationService } from 'primeng/components/common/api';
import { PessoaService } from './pessoas/pessoa.service';

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
    CoreModule
  ],
  providers: [LancamentoService, PessoaService, MessageService, ConfirmationService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
