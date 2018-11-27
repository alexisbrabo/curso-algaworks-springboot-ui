import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/components/common/api';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  usuario = '';
  senha = '';
  jwtPayLoad: any;


  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private jwtHelper: JwtHelperService
  ) { this.carregarToken(); }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.usuario, this.senha).subscribe(response => {
      console.log(response);
      this.armazenarToken(response.access_token);
    },
      error => {
        this.messageService.add({ severity: 'error', detail: error });
      });
  }

  private armazenarToken(token: string) {
    this.jwtPayLoad = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
