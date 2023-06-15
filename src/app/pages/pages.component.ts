import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ROLE } from '../shared/helpers/constants';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  menus = [
    { name: 'Devoirs', icon: 'assignment', route: '/assignments', acces: [ROLE.admin, ROLE.etudiant, ROLE.professeur] },
    { name: 'Utilisateurs', icon: 'supervised_user_circle', route: '/users', acces: [ROLE.admin] },
    { name: 'Matières', icon: 'book', route: '/matieres', acces: [ROLE.admin] },

  ];
  router: any;

  constructor(
    private authService: AuthService,
    private route: Router
  ) {

  }

  canAccess(menu: any) {
    return menu.acces.includes(this.authService.userRole)
  }

  get isLogged(): boolean {
    return this.authService.loggedIn;
  }

  get userLogged() {
    return this.authService.userConnected;
  }

  isActive(url: string): boolean {
    const currentUrl = this.route.url;
    return currentUrl.indexOf(url) >= 0;
  }

  logout(): void {
    this.authService.logOut();
    this.route.navigateByUrl("/auth/login")
  }

}
