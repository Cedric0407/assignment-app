import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

import { NotificationService } from 'src/app/shared/services/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login!: string;
  password!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) { }

  onLogin(): void {
    this.authService.logIn(this.login, this.password).subscribe(
      (resp) => {
        if (resp.token) {
          this.router.navigate(['/']);
        }
      },
      (error) => {
        console.log("error.error", error.error)
        if (error.error.message) {
          this.notification.showNotification(error.error.message, 'error');
        }
      }
    );
  }
}
