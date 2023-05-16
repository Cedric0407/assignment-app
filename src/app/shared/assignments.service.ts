import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
// tableau de devoirs à rendre
assignments:Assignment[] = [
  {
    id:1,
    nom: "Devoir Angular de Mr Buffa",
    dateDeRendu: new Date("2023-06-01"),
    rendu:false
  },
  {
    id:2,
    nom: "Devoir Grails de Mr Galli",
    dateDeRendu: new Date("2023-04-15"),
    rendu:true
  },
  {
    id:3,
    nom: "Devoir Big Data de Mr Mopolo",
    dateDeRendu: new Date("2023-02-10"),
    rendu:true
  }
]
  constructor(private loggingService:LoggingService) { }

  getAssignments():Observable<Assignment[]> {
    // normalement on doit envoyer une requête HTTP
    // sur un web service, et ça peut prendre du temps
    // On a donc besoin "d'attendre que les données arrivent".
    // Angular utilise pour cela la notion d'Observable

    // of() permet de créer un Observable qui va
    // contenir les données du tableau assignments
    return of(this.assignments);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    // Plus tard on utilisera un Web Service et une BD
    
    // On va chercher dans le tableau des assignments
    // l'assignment dont l'id est celui passé en paramètre
    const assignment = this.assignments.find(a => a.id === id);
    // on retourne cet assignment encapsulé dans un Observable
    return of(assignment);
  }

  addAssignment(assignment:Assignment):Observable<string> {
    // plus tard on utilisera un web service pour l'ajout dans une vraie BD

    // on ajoute le devoir au tableau des devoirs
    this.assignments.push(assignment);
    // on retourne un message de succès à travers
    // un Observable
    this.loggingService.log(assignment.nom, 'ajouté');
    return of(`Assignment ${assignment.nom} ajouté avec succès`);
  }

  updateAssignment(assignment:Assignment):Observable<string> {
    // Normalement : on appelle un web service pour l'update des
    // données

    // dans la version tableau : rien à faire (pourquoi ? Parceque assignment
    // est déjà un élément du tableau this.assignments)

    this.loggingService.log(assignment.nom, 'modifié');

    return of(`Assignment ${assignment.nom} modifié avec succès`)
  }

  deleteAssignment(assignment:Assignment):Observable<string> {
      // pour supprimer on passe à la méthode splice
    // l'index de l'assignment à supprimer et 
    // le nombre d'éléments à supprimer (ici 1)
    const index = this.assignments.indexOf(assignment);
    this.assignments.splice(index, 1);

    this.loggingService.log(assignment.nom, 'supprimé');

    return of('Assignment supprimé avec succès')
  }
}
