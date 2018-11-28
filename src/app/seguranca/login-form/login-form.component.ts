import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/components/common/api';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  usuario = '';
  senha = '';
  constructor(
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router
  ) { }

  login() {
    this.auth.login(this.usuario, this.senha)
      .then(() => {
        this.router.navigate(['/lancamentos']);
      })
      .catch(error => {
        if (error.status === 400) {
          if (error.error.error === 'invalid_grant') {
            this.messageService.add({ severity: 'error', detail: 'Usuário ou senha inválida!' });
          }
        }
      });
  }

}
