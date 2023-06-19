import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Matiere } from 'src/app/model/matiere';
import { ENDPOINT } from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {
  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  uri_api = `${ENDPOINT}matieres`;

  
  getMatieres(filter: { idMatiere?: string; } = undefined): Observable<any> {

    let renduFilter = '';
    if (filter) {
      for (let property in filter) {
        renduFilter += `&${property}=${filter[property]}`
      }
    }

    const headers = new HttpHeaders()
      .set('x-access-token', encodeURIComponent(this.authService.token as string));

    return this.http.get<Matiere[]>(this.uri_api + "?" + renduFilter, { headers });

  }

  getMatiere(id: string): Observable<Matiere | undefined> {
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);

    return this.http.get<Matiere | undefined>(`${this.uri_api}/${id}`, { headers })

  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  };

  addMatiere(matiere: Matiere, imageFile: any): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);
    const uploadData = new FormData();
    for (let property in matiere) {
      if (matiere[property]) {
        if (property === 'professeur') uploadData.append(property, JSON.stringify(matiere[property]));
        else uploadData.append(property, matiere[property]);
      }
    }
    if (imageFile) uploadData.append('image', imageFile);
    return this.http.post<Matiere>(this.uri_api, uploadData, { headers });

  }

  updateMatiere(matiere: Matiere, imageFile: any): Observable<any> {

    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);
    const uploadData: any = { _id: matiere._id };
    for (let property in matiere) {
      if (matiere[property]) {
        if (property === 'professeur') uploadData[property] = JSON.stringify(matiere[property]);
        else uploadData[property] = matiere[property];
      }
    }
    uploadData['image'] = imageFile ?? null;
    return this.http.put<Matiere>(this.uri_api, uploadData, { headers });
  }

  deleteMatiere(matiere: Matiere): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);

    return this.http.delete(this.uri_api + "/" + matiere._id, { headers })

  }
}
