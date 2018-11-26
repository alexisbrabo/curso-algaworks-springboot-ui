import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { MessageService } from 'primeng/components/common/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) {

  }

  handle(error: any) {
    let msg: string;
    console.log(error);
    if (typeof error === 'string') {
      msg = error;
    } else {
      if (error.status.toString().startsWith(4)) {
        msg = error.error[0].mensagemUsuario;
      } else {
        msg = 'Falha no processamento. Tente Novamente';
      }
    }
    console.log('erro', error);
    return throwError(msg);
  }
}
