import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion de devoirs à rendre';

  constructor(private authService:AuthService, private router:Router) {}

  login() {
    // utilise l'authService pour se connecter
    if(!this.authService.loggedIn) {
      this.authService.logIn();
    } else {
      this.authService.logOut();
      // et on navigue vers la page d'accueil
      this.router.navigate(["/home"]);
    }
  }
}
