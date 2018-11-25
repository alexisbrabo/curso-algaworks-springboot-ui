import { Routes, RouterModule } from '@angular/router';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { NgModule } from '@angular/core';
import { LancamentosRoutingModule } from './lancamentos/lancamentos-routing.module';

const routes: Routes = [
    // { path: '', redirectTo: 'lancamentos', pathMatch: 'prefix' },
    { path: 'pessoas', component: PessoasPesquisaComponent },
    { path: 'pessoas/nova', component: PessoaCadastroComponent },
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
    { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        LancamentosRoutingModule
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
