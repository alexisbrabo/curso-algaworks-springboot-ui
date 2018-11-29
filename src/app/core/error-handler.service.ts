import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { NotAuthenticatedError } from '../seguranca/money-http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private router: Router) {

  }

  handle(error: any) {
    let msg: string;
    if (typeof error === 'string') {
      msg = error;
    } else if (error instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      this.router.navigate(['/login']);
    } else if (error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      msg = 'Usuário ou Senha inválida!';
    } else if (error.status === 403) {
      msg = 'Você não tem permissão para esta ação!';
    } else if (error.status.toString().startsWith(4)) {
      msg = error.error[0].mensagemUsuario;
    } else {
      msg = 'Falha no processamento. Tente Novamente';
    }

    console.log('erro', error);
    return throwError(msg);
  }
}
