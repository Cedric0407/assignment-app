import { Component, OnInit } from '@angular/core';

import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit{

  titre="Liste des devoirs à rendre";
  c="orange";
  ajoutActive=false;
  formVisible=false;
  // assignment cliqué
  assignmentSelectionne!:Assignment;

  
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

  ngOnInit(): void {
    console.log("Composant instancié et rendu HTML effectué (le composant est visible dans la page HTML)");
    setTimeout(() => {
      this.ajoutActive=true;
    }, 4000);
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
    this.assignments.push(a);

    // et on re-affiche la liste (on cache le formulaire)
    this.formVisible = false;
  }
  
}
