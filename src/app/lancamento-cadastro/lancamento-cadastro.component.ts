import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css'],
  preserveWhitespaces: true
})
export class LancamentoCadastroComponent implements OnInit {

  pt: any;
  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  constructor(private app: AppComponent) { }

  ngOnInit() {
    this.pt = this.app.pt;
  }

}
