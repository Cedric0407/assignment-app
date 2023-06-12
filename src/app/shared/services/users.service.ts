import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  uri_api = 'http://localhost:8010/api/users';

  getUsers(): Observable<any> {

    const headers = new HttpHeaders()
      .set('x-access-token', encodeURIComponent(this.authService.token as string));

    return this.http.get<User[]>(this.uri_api, { headers });

  }

  getUser(id: number): Observable<User | undefined> {
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);

    return this.http.get<User | undefined>(`${this.uri_api}/${id}`)

  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  };

  addUser(user: User, imageFile?: any): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);
    const uploadData = new FormData();
    for (let property in user) {
      if (user[property]) {
        uploadData.append(property, user[property]);
        console.log("user[property]", user[property])
      }
    }
    if (imageFile) uploadData.append('image', imageFile);

    return this.http.post<User>(this.uri_api, uploadData, { headers });

  }

  updateUser(user: User): Observable<any> {

    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);

    return this.http.put<User>(this.uri_api, user, { headers });
  }

  deleteUser(user: User): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);

    return this.http.delete(this.uri_api + "/" + user._id, { headers })

  }
}
