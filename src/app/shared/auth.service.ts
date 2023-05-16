import { Injectable } from '@angular/core';
import { of } from 'rxjs';

class User {
  login!: string;
  role!: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;


  users = [
    {
      login: 'teste@admin.com',
      password: '123456',
      role: 'admin'
    },
    {
      login: 'teste@user.com',
      password: '123456',
      role: 'user'
    },

  ];

  userConnected?: User;

  constructor() { }

  // théoriquement, on devrait passer en paramètre le login
  // et le password, cette méthode devrait faire une requête
  // vers un Web Service pour vérifier que c'est ok, renvoyer
  // un token d'authentification JWT etc.
  // elle devrait renvoyer un Observable etc.
  logIn(login: string, password: string) {
    const user = this.users.find(elt => elt.login === login && elt.password === password);
    if (user) {
      this.userConnected = { login: user.login, role: user.role };
      this.loggedIn = true;
      return true;
      console.log("ON EST LOGGÉ");
    }
    console.log("USER NON TROUVÉ");
    return false;
  }

  logOut() {
    console.log("ON SE DELOGGE")
    this.userConnected = undefined;
    this.loggedIn = false;
  }

  getUserConnected() {
    return of(this.userConnected)
  }

  // si on l'utilisait on ferai isAdmin().then(...)
  isAdmin(): Promise<boolean> {
    // Pour le moment, version simplifiée...
    // on suppose qu'on est admin si on est loggué
    const isUserAdminPromise = new Promise<boolean>((resolve, reject) => {
      resolve(this.loggedIn && this.userConnected?.role === "admin");
    });

    // on renvoie la promesse qui dit si on est admin ou pas
    return isUserAdminPromise;
  }

  // si on l'utilisait on ferai isAdmin().then(...)
  isLoggedIn(): Promise<boolean> {
    // Pour le moment, version simplifiée...
    // on suppose qu'on est admin si on est loggué
    const isLoggedIn = new Promise<boolean>((resolve, reject) => {
      resolve(this.loggedIn);
    });

    // on renvoie la promesse qui dit si on est admin ou pas
    return isLoggedIn;
  }
}
