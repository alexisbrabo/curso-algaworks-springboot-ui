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

    if (typeof error === 'string') {
      msg = error;
    } else {
      msg = 'Falha no processamento. Tente Novamente';
    }
    console.log('erro', error);
    return throwError(msg);
  }
}
