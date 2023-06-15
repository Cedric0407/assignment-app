import { Injectable } from '@angular/core';
import { Assignment } from '../../model/assignment.model';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { bdInitialAssignments } from '../data/data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  // tableau de devoirs à rendre
  assignments: Assignment[] = []
  constructor(
    private loggingService: LoggingService,
    private authService: AuthService,
    private http: HttpClient) { }

  uri_api = 'http://localhost:8010/api/assignments';
  // uri_api = 'https://mbds-madagascar-2022-2023-back-end.onrender.com/api/assignments';

  getAssignments(page: number, limit: number, filter: { rendu?: boolean; idMatiere?: string; idEtudiant?: string } = undefined): Observable<any> {

    let renduFilter = '';
    if (filter) {
      for (let property in filter) {
        renduFilter += `&${property}=${filter[property]}`
      }
    }

    const headers = new HttpHeaders()
      .set('x-access-token', encodeURIComponent(this.authService.token as string));

    return this.http.get<Assignment[]>(this.uri_api + "?page=" + page + "&limit=" + limit + renduFilter, { headers });

    // of() permet de créer un Observable qui va
    // contenir les données du tableau assignments
    //return of(this.assignments);
  }

  getAssignmentsQuery(page: number, limit: number, filter: { rendu?: boolean; idMatieres?: string[]; idEtudiant?: string } = undefined): Observable<any> {

    const body = { page, limit };

    for (let property in filter) {
      body[property] = filter[property];

    }

    const headers = new HttpHeaders()
      .set('x-access-token', encodeURIComponent(this.authService.token as string))

    return this.http.post<Assignment[]>(this.uri_api + "/filter", body, { headers });

    // of() permet de créer un Observable qui va
    // contenir les données du tableau assignments
    //return of(this.assignments);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    // Plus tard on utilisera un Web Service et une BD
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);

    return this.http.get<Assignment | undefined>(`${this.uri_api}/${id}`)

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
        catchError(this.handleError<Assignment>("Erreur dans le traitement de assignment avec id = " + id))
      )

    // On va chercher dans le tableau des assignments
    // l'assignment dont l'id est celui passé en paramètre

    //const assignment = this.assignments.find(a => a.id === id);
    // on retourne cet assignment encapsulé dans un Observable
    //return of(assignment);
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  };

  addAssignment(assignment: Assignment, file?: any): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);

    const uploadData = new FormData();
    for (let property in assignment) {
      if (assignment[property]) {
        if (property === 'matiere' || property === 'auteur') uploadData.append(property, JSON.stringify(assignment[property]));
        else uploadData.append(property, assignment[property]);
      }
    }
    if (file) uploadData.append('file', file);

    return this.http.post<Assignment>(this.uri_api, uploadData, { headers });
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    // Normalement : on appelle un web service pour l'update des
    // données
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);

    return this.http.put<Assignment>(this.uri_api, assignment, { headers });

    // dans la version tableau : rien à faire (pourquoi ? Parceque assignment
    // est déjà un élément du tableau this.assignments)

    //this.loggingService.log(assignment.nom, 'modifié');

    //return of(`Assignment ${assignment.nom} modifié avec succès`)
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    const headers = new HttpHeaders().set('x-access-token', this.authService.token as string);

    return this.http.delete(this.uri_api + "/" + assignment._id, { headers })
    // pour supprimer on passe à la méthode splice
    // l'index de l'assignment à supprimer et
    // le nombre d'éléments à supprimer (ici 1)
    /*
    const index = this.assignments.indexOf(assignment);
    this.assignments.splice(index, 1);

    this.loggingService.log(assignment.nom, 'supprimé');

    return of('Assignment supprimé avec succès')
    */
  }

  peuplerBD() {
    bdInitialAssignments.forEach(a => {
      const newAssignment = new Assignment();
      newAssignment._id = a._id.toString();
      newAssignment.nom = a.nom;
      newAssignment.dateDeRendu = new Date(a.dateDeRendu);
      newAssignment.rendu = a.rendu;

      this.addAssignment(newAssignment)
        .subscribe((reponse) => {
          console.log(reponse.message);
        })
    })
  }

  // cette version retourne un Observable. Elle permet de savoir quand
  // l'opération est terminée (l'ajout des 1000 assignments)
  peuplerBDavecForkJoin(): Observable<any> {
    // tableau d'observables (les valeurs de retour de addAssignment)
    let appelsVersAddAssignment: Observable<any>[] = [];

    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment._id = a._id.toString();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
    });

    return forkJoin(appelsVersAddAssignment);
  }

}
