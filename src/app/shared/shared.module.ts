import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {ToastModule} from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    MessagesModule,
    MessageModule,
    ToastModule
  ],
  declarations: [MessageComponent],
  exports: [MessageComponent, ToastModule]
})
export class SharedModule { }
