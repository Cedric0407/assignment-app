import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {

  }

  onLogin(): void {
    if (this.authService.logIn(this.login, this.password)) {
      this.router.navigate(['/home']);
    }

  }
}
