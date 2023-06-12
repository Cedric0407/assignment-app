import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  menus = [
    { name: 'Devoirs', icon: 'home', route: '/', isActive: false },
    { name: 'Utilisateurs', icon: 'add', route: '/users', isActive: false },
    { name: 'Matières', icon: 'add', route: '/matieres', isActive: false },

  ];

  constructor(
    private authService: AuthService,
    private route: Router
  ) {

  }

  get isLogged(): boolean {
    return this.authService.loggedIn;
  }

  get userLogged() {
    return this.authService.userConnected;
  }

  clickMenu(newActive: any): void {
    const lastActive = this.menus.find(elt => elt.isActive);
    if (lastActive) lastActive.isActive = false;
    newActive.isActive = true;
  }

  logout(): void {
    this.authService.logOut();
    this.route.navigateByUrl("/auth/login")
  }

}
