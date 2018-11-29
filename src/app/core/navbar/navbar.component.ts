import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LogoutService } from 'src/app/seguranca/logout.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/components/common/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private logoutService: LogoutService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  async logout() {
    this.logoutService.logout()
      .subscribe(() => {
        this.auth.limparAccessToken();
        this.router.navigate(['/login']);
      },
        error => {
          this.messageService.add({ severity: 'error', detail: error });
        });
  }

}
