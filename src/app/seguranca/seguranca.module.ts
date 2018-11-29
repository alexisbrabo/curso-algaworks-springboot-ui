import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { AuthGuard } from './auth.guard';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedDomains
      }
    }),
    InputTextModule,
    ButtonModule,
    SegurancaRoutingModule
  ],
  declarations: [LoginFormComponent],
  providers: [AuthGuard]
})
export class SegurancaModule { }
