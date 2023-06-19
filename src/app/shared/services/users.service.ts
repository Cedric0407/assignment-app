import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/user';
import { ENDPOINT } from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  uri_api = `${ENDPOINT}api/users`;
  
  getUsers( format = true): Observable<any> {

    const headers = new HttpHeaders()
      .set('x-access-token', encodeURIComponent(this.authService.token as string));

    return this.http.get<User[]>(this.uri_api, { headers })
    .pipe(
      map(users =>{

        if(!format) return users
        users.map(user =>{
            if(user.imagePath){
              user.imagePath = ENDPOINT + user.imagePath;
            }
            return user;
          })
         return users;
      })
    );

  }

  getUser(id: string): Observable<User | undefined> {
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);

    return this.http.get<User | undefined>(`${this.uri_api}/${id}`, { headers })
    .pipe(
      map( user =>{
        if(user.imagePath){
          user.imagePath = ENDPOINT+user.imagePath
        }
        return user
      })
      )

  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  };

  addUser(user: User, imageFile?: any, password?: string): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);
    const uploadData = new FormData();
    for (let property in user) {
      if (user[property]) {
        uploadData.append(property, user[property]);
      }
    }
    if (imageFile) uploadData.append('image', imageFile);
    if (password) uploadData.append('password', password);

    return this.http.post<User>(this.uri_api, uploadData, { headers });

  }

  updateUser(user: User, imageFile?: any, password?: string): Observable<any> {

    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);
    const uploadData = { ...user };
    uploadData['image'] = imageFile ?? null;
    if (password) uploadData['password'] = password;

    return this.http.put<User>(this.uri_api, uploadData, { headers });
  }

  deleteUser(user: User): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);

    return this.http.delete(this.uri_api + "/" + user._id, { headers })

  }
}
