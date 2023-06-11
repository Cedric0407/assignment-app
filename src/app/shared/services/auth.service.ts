import { Injectable } from '@angular/core';
import { catchError, map, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { serializeFormData } from '../helpers/helpers';
import { User } from '../../model/user'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // uri_api = 'https://mbds-madagascar-2022-2023-back-end.onrender.com/api/auth';
  uri_api = 'http://localhost:8010/api/auth';

  constructor(private http: HttpClient, private router: Router) { }

  // théoriquement, on devrait passer en paramètre le login
  // et le password, cette méthode devrait faire une requête
  // vers un Web Service pour vérifier que c'est ok, renvoyer
  // un token d'authentification JWT etc.
  // elle devrait renvoyer un Observable etc.
  logIn(login: string, password: string) {
    console.log("login")
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    // Convertir les données en format x-www-form-urlencoded
    const body = serializeFormData({ email: login, password });

    // Effectuer la requête POST en utilisant HttpClient
    return this.http.post(`${this.uri_api}/login`, body, { headers })
      .pipe(
        map((response: any) => {
          if (response.user && response.token) {
            localStorage.setItem('token', response.token);
            const user: User = { ...response.user, id: response.user?._id };
            localStorage.setItem('user', JSON.stringify(response.user));
          }

          return response;
        })
      );
  }

  logOut() {
    console.log("ON SE DELOGGE")
    localStorage.clear();
    this.router.navigateByUrl("/")

  }

  get userConnected(): User | null {
    return JSON.parse(localStorage.getItem('user') ?? 'null');
  }

  get loggedIn(): boolean {
    return this.userConnected ? true : false;
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  getuserConnected() {
    return of(this.userConnected);
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
