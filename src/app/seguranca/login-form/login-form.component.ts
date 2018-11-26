import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/components/common/api';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  usuario = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  login(form: FormControl) {

    this.authService.login(this.usuario, this.senha).subscribe(response => {
      console.log(response);
    });
  }

}
