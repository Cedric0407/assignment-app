import { Component, OnInit } from '@angular/core';

import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit{

  titre="Liste des devoirs à rendre";
  formVisible=false;
  // les données à afficher
  assignments:Assignment[] = [];

  // assignment cliqué
  assignmentSelectionne!:Assignment;

  constructor(private assignmentsService:AssignmentsService) { }
  

  ngOnInit(): void {
    console.log("Composant instancié et rendu HTML effectué (le composant est visible dans la page HTML)");
    console.log("On va chercher les assignments dans le service");

    this.assignmentsService.getAssignments()
    .subscribe(assignments => {
      this.assignments = assignments;
      console.log("Données reçues");
    });
  }
  

  
  onAssignmentClique(assignment:Assignment) {
    console.log("Assignment cliqué : " + assignment.nom);
    this.assignmentSelectionne = assignment;
  }

  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }

  onNouvelAssignment(a:Assignment) {
    // on ajoute l'assignment reçu du composant
    // add-assignment sous forme d'évent
    //this.assignments.push(a);
    this.assignmentsService.addAssignment(a)
    .subscribe(message => {
      console.log(message);
      
      // et on re-affiche la liste (on cache le formulaire)
      this.formVisible = false;
    });
  }
  
}
