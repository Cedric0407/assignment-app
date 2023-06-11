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
    { name: 'Mes devoirs', icon: 'home', route: '/', isActive: false },
    { name: 'Ajouter', icon: 'add', route: '/add', isActive: false }
  ];

  constructor(
    private authService: AuthService,
    private route: Router
  ) {

  }

  get isLogged(): boolean {
    return this.authService.loggedIn;
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
