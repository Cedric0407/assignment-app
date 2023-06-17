import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Assignment } from '../../model/assignment.model';
import { AssignmentsCardlistComponent } from 'src/app/shared/components/assignments-cardlist/assignments-cardlist.component';

import { ModalRendreAssignmentComponent } from '../../shared/components/modal-rendre-assignment/modal-rendre-assignment.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ROLE } from 'src/app/shared/helpers/constants';
import { MatieresService } from '../../shared/services/matieres.service';
import { Matiere } from 'src/app/model/matiere';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent {

  titre = "Liste des devoirs à rendre";
  selectedTab: number = 2;
  assignmentsToUpdate: Assignment[] = [];
  @ViewChild('renduComponent', { static: false }) renduElt!: AssignmentsCardlistComponent;
  @ViewChild('nonRenduComponent', { static: false }) nonRenduElt!: AssignmentsCardlistComponent;
  assignmentToRendre?: Assignment;
  role = ROLE;
  matiereList: Matiere[] = [];
  matiereIdFilter!: string;
  constructor(
    private matieresService: MatieresService,
    public authservice: AuthService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private assignmentsService: AssignmentsService

  ) { }

  ngOnInit(): void {
    this.getMatieres()
  }

  getMatieres() {
    let filter;
    if (this.matiereIdFilter) {
      filter = { idMatiere: this.matiereIdFilter }
    }
    this.matieresService.getMatieres(filter).subscribe(resp => {
      this.matiereList = resp;

      // this.setAssignmentData()
    })
  }

  /*setAssignmentData() { // insertion des matières dans les données existantes
    const file = ['http://localhost:8010/uploads\\1686981465476-sample.pdf', "http://localhost:8010/uploads\\1686982809343-solution_chaînage.png"
    ]
    this.assignmentsService.getAssignmentsSansPagination().subscribe(resp => {
      const all = resp
      const maxIndexMAtiere = (file.length - 1);
      let indexMAtiere = 0;
      resp.forEach((assignment: Assignment, index) => {
        indexMAtiere = Math.floor(Math.random() * maxIndexMAtiere)
        assignment.filePath = file[indexMAtiere];
        assignment.dateDeRendu = new Date();

        this.assignmentsService.updateAssignment(assignment).subscribe(resp2 => {
          console.log("update q@@@@@@ " + index)
        })
      })

    })
  }*/

  handleMatiereChange(event) {
    this.matiereIdFilter = event
  }

  selectTab(tabNumber: number) {
    this.selectedTab = tabNumber;
  }

  get userRole() {
    return this.authservice.userRole;
  }

  onTabDroppedToRendu(event: CdkDragDrop<any>): void {

    const assignment = event.item.data as Assignment;
    if (assignment.rendu) return;
    this.assignmentToRendre = assignment;
    assignment.rendu = true;
    this.openModal();

  }

  onTabDroppedToNonRendu(event: CdkDragDrop<any>): void {
    const assignment = event.item.data as Assignment;
    return;
  }

  openModal() {
    const dialogRef: MatDialogRef<ModalRendreAssignmentComponent> = this.dialog.open(ModalRendreAssignmentComponent, {
      width: '600px',
      data: {
        assignment: this.assignmentToRendre,
        nonRenduElt: this.nonRenduElt
      }
    });

    // Vous pouvez également écouter les événements de la modal si nécessaire
    dialogRef.afterClosed().subscribe(result => {
      this.assignmentToRendre = undefined;
    });
  }

}
