import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
// tableau de devoirs à rendre
assignments:Assignment[] = [
  {
    nom: "Devoir Angular de Mr Buffa",
    dateDeRendu: new Date("2023-06-01"),
    rendu:false
  },
  {
    nom: "Devoir Grails de Mr Galli",
    dateDeRendu: new Date("2023-04-15"),
    rendu:true
  },
  {
    nom: "Devoir Big Data de Mr Mopolo",
    dateDeRendu: new Date("2023-02-10"),
    rendu:true
  }
]
  constructor() { }

  getAssignments():Observable<Assignment[]> {
    // normalement on doit envoyer une requête HTTP
    // sur un web service, et ça peut prendre du temps
    // On a donc besoin "d'attendre que les données arrivent".
    // Angular utilise pour cela la notion d'Observable

    // of() permet de créer un Observable qui va
    // contenir les données du tableau assignments
    return of(this.assignments);
  }

  addAssignment(assignment:Assignment):Observable<string> {
    // plus tard on utilisera un web service pour l'ajout dans une vraie BD

    // on ajoute le devoir au tableau des devoirs
    this.assignments.push(assignment);
    // on retourne un message de succès à travers
    // un Observable
    return of(`Assignment ${assignment.nom} ajouté avec succès`);
  }

  updateAssignment(assignment:Assignment):Observable<string> {
    // Normalement : on appelle un web service pour l'update des
    // données

    // dans la version tableau : rien à faire (pourquoi ? Parceque assignment
    // est déjà un élément du tableau this.assignments)

    return of(`Assignment ${assignment.nom} modifié avec succès`)
  }

  
}
