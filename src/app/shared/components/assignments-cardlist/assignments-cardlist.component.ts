import { Component, Input } from '@angular/core';
import { Assignment } from '../../../pages/assignments/assignment.model';
import { AssignmentsService } from '../../../shared/services/assignments.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-assignments-cardlist',
  templateUrl: './assignments-cardlist.component.html',
  styleUrls: ['./assignments-cardlist.component.css']
})
export class AssignmentsCardlistComponent {
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

  @Input() rendu?: boolean;

  constructor(
    public authservice: AuthService,
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute
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
  getAssignments() {
    console.log("On va chercher les assignments dans le service", this.rendu);
    this.assignmentsService.getAssignments(this.page, this.limit, this.rendu)
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
