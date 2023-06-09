import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Assignment } from '../../../model/assignment.model';
import { AssignmentsService } from '../../../shared/services/assignments.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalConfirmationDeleteComponent } from 'src/app/shared/components/modal-confirmation-delete/modal-confirmation-delete.component';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-assignments-datalist',
  templateUrl: './assignments-datalist.component.html',
  styleUrls: ['./assignments-datalist.component.css']
})
export class AssignmentsDatalistComponent {
  assignments: Assignment[] = [];
  @Input() matiereIdFilter!: string;

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

  displayedColumns: string[] = ['matiere', 'etudiant', 'nom', 'dateDeRendu', 'rendu', 'action'];

  constructor(
    public authservice: AuthService,
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private notification: NotificationService

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['matiereIdFilter'] || changes['matiereList']) {
      this.getAssignments()
    }
  }

  getAssignments() {
    console.log("On va chercher les assignments dans le service", this.page, this.limit);
    const filter: any = {};
    if (this.matiereIdFilter) {
      filter.idMatieres = [this.matiereIdFilter]
    }

    this.assignmentsService.getAssignmentsQuery(this.page, this.limit, filter)
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
      }, error => {
        this.notification.showNotification("Erreur serveur", "error");
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


    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.getAssignments();
  }

  openModalDelete(row: Assignment) {
    const dialogRef: MatDialogRef<ModalConfirmationDeleteComponent> = this.dialog.open(ModalConfirmationDeleteComponent, {
      width: '600px',
      data: {
        entity: row,
        model: 'Assignment'
      }
    });

    // Vous pouvez également écouter les événements de la modal si nécessaire
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.getAssignments()
    });
  }
}
