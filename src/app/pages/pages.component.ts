import { Component } from '@angular/core';

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



  clickMenu(newActive: any): void {
    const lastActive = this.menus.find(elt => elt.isActive);
    if (lastActive) lastActive.isActive = false;
    newActive.isActive = true;
  }

}
