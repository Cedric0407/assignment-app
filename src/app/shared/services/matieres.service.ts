import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Matiere } from 'src/app/model/matiere';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {
  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  uri_api = 'http://localhost:8010/api/matieres';

  getMatieres(page: number, limit: number): Observable<any> {


    const headers = new HttpHeaders()
      .set('x-access-token', encodeURIComponent(this.authService.token as string));

    return this.http.get<Matiere[]>(this.uri_api + "?page=" + page + "&limit=" + limit, { headers });

  }

  getMatiere(id: number): Observable<Matiere | undefined> {
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);

    return this.http.get<Matiere | undefined>(`${this.uri_api}/${id}`)

      .pipe(
        map(a => {
          if (a) {
            a.nom += " MAP MAP MAP";
          }
          return a;
        }),
        tap(a => {
          if (a)
            console.log("ICI DANS LE TAP " + a.nom)
        }),
        map(a => {
          if (a) {
            a.nom += " TOTOTOTO";
          }
          return a;
        }),
        catchError(this.handleError<Matiere>("Erreur dans le traitement de matiere avec id = " + id))
      )
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  };

  addMatiere(matiere: Matiere): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);

    return this.http.post<Matiere>(this.uri_api, matiere, { headers });

  }

  updateMatiere(matiere: Matiere): Observable<any> {

    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);

    return this.http.put<Matiere>(this.uri_api, matiere, { headers });
  }

  deleteMatiere(matiere: Matiere): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);

    return this.http.delete(this.uri_api + "/" + matiere._id, { headers })

  }
}
