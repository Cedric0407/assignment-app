import { Component, OnInit } from '@angular/core';

import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {

  titre = "Liste des devoirs à rendre";
  // les données à afficher
  assignments: Assignment[] = [];

  constructor(private assignmentsService: AssignmentsService , public authService:AuthService) { }

  ngOnInit(): void {
    console.log("Composant instancié et rendu HTML effectué (le composant est visible dans la page HTML)");
    console.log("On va chercher les assignments dans le service");

    this.assignmentsService.getAssignments()
      .subscribe(assignments => {
        this.assignments = assignments;
        console.log("Données reçues");
      });
  }
}
