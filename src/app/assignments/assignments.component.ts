import { Component, OnInit } from '@angular/core';

import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre = "Liste des devoirs à rendre";
  // les données à afficher
  assignments: Assignment[] = [];
  // propriétés pour la pagination
  page: number = 1;
  limit: number = 10;
  totalDocs: number = 0;
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
  ;
  isInitialized = false;
  constructor(
    public authservice: AuthService,
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("Composant instancié et rendu HTML effectué (le composant est visible dans la page HTML)");
    // exercice : regarder si il existe des query params
    // page et limit, récupérer leur valeurs si elles existent
    // et les passer à la méthode getAssignments
    // TODO
    this.route.queryParams.subscribe(params => {
      if (params['page'] && params['limit']) {
        this.page = params['page'] as number;
        this.limit = params['limit'] as number;
      }

      this.getAssignments();

    })


    //this.getAssignments();
  }

  getAssignments() {
    console.log("On va chercher les assignments dans le service");

    this.assignmentsService.getAssignments(this.page, this.limit)
      .subscribe(data => {
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;

        console.log("Données reçues", data);
      });
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignments();
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignments();
  }
  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }
}
