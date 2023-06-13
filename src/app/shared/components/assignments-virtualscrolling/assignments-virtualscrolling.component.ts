import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Assignment } from '../../../model/assignment.model';
import { AssignmentsService } from '../../../shared/services/assignments.service';
import { AuthService } from '../../../shared/services/auth.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-assignments-virtualscrolling',
  templateUrl: './assignments-virtualscrolling.component.html',
  styleUrls: ['./assignments-virtualscrolling.component.css']
})
export class AssignmentsVirtualscrollingComponent {
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
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  constructor(
    public authservice: AuthService,
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) { }



  ngOnInit(): void {
    console.log("OnInit Composant instancié et juste avant le rendu HTML (le composant est visible dans la page HTML)");
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

  ngAfterViewInit() {
    console.log("after view init");

    if (!this.scroller) return;
    console.log("##################", this.scroller)
    // on s'abonne à l'évènement scroll de la liste
    this.scroller.elementScrolled()
      .pipe(
        tap(event => {
          //console.log(event);
        }),
        map(event => {
          return this.scroller.measureScrollOffset('bottom');
        }),
        tap(y => {
          //console.log("y = " + y);
        }),
        pairwise(),
        tap(([y1, y2]) => {
          //console.log("y1 = " + y1 + " y2 = " + y2);
        }),
        filter(([y1, y2]) => {
          return y2 < y1 && y2 < 100;
        }),
        // Pour n'envoyer des requêtes que toutes les 200ms
        //throttleTime(200)
      )
      .subscribe((val) => {
        console.log("val = " + val);
        console.log("je CHARGE DE NOUVELLES DONNEES page = " + this.page);
        this.ngZone.run(() => {
          if (!this.hasNextPage) return;

          this.page = this.nextPage;
          this.getAddAssignmentsForScroll();
        });
      });
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

  getAddAssignmentsForScroll() {
    this.assignmentsService.getAssignments(this.page, this.limit)
      .subscribe(data => {
        // au lieu de remplacer le tableau, on va concaténer les nouvelles données
        this.assignments = this.assignments.concat(data.docs);
        // ou comme ceci this.assignments = [...this.assignments, ...data.docs]
        //this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPage = data.hasPrevPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.nextPage = data.nextPage;

        console.log("Données ajoutées pour scrolling");
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

  // Pour mat-paginator
  handlePage(event: any) {
    console.log(event);

    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getAssignments();
  }

}