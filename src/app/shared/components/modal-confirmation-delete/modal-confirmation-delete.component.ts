import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AssignmentsService } from '../../services/assignments.service';
import { UsersService } from '../../services/users.service';
import { MatieresService } from '../../services/matieres.service';
import { Assignment } from 'src/app/model/assignment.model';
import { User } from 'src/app/model/user';
import { Matiere } from 'src/app/model/matiere';

@Component({
  selector: 'app-modal-confirmation-delete',
  templateUrl: './modal-confirmation-delete.component.html',
})
export class ModalConfirmationDeleteComponent {

  entityToDelete!: Matiere | User | Assignment
  isSaving = false;

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmationDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assignmentsService: AssignmentsService,
    private matieresService: MatieresService,
    private usersService: UsersService,
    private notification: NotificationService,
  ) { }

  ngOnInit() {
    this.entityToDelete = this.data.entity;
  }

  save() {
    if (this.data.model === 'User') this.deleteUser();
    else if (this.data.model === 'Assignment') this.deleteAssignment();
    else if (this.data.model === 'Matiere') this.deleteMatiere();
    this.dialogRef.close(true);
  }

  deleteUser() {
    this.isSaving = true;
    this.usersService.deleteUser(this.entityToDelete as User).subscribe(resp => {
      this.hanldeSucces();
    }, err => {
      this.hanldeError();
    })
  }
  deleteAssignment() {
    this.isSaving = true;
    this.assignmentsService.deleteAssignment(this.entityToDelete as Assignment).subscribe(resp => {
      this.hanldeSucces();
    }, err => {
      this.hanldeError();
    })
  }
  deleteMatiere() {
    this.isSaving = true;
    this.matieresService.deleteMatiere(this.entityToDelete as Matiere).subscribe(resp => {
      this.hanldeSucces();
    }, err => {
      this.hanldeError();
    })
  }

  hanldeSucces() {
    this.dialogRef.close(true);
    this.isSaving = true
    this.notification.showNotification('Suppression effectuée', 'succes')
  }
  hanldeError() {
    this.isSaving = true
    this.notification.showNotification('Une erreur s\'est survenu', 'error');
  }

  close() {
    // Fermez la modal sans renvoyer de données
    this.dialogRef.close();
  }

}
