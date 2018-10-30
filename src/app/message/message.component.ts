import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="{{ classes }}" *ngIf="temErro()">
      <p-message severity="error" text="{{ text }}"></p-message>
    </div>
  `,
  styles: [`
    body .ui-message.ui-message-error {
      margin-top: 4px;
    }
  `]
})
export class MessageComponent {
  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;
  @Input() classes: string;

  temErro() {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
