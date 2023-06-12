import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Assignment } from '../../../model/assignment.model';
import { AssignmentsService } from '../../../shared/services/assignments.service';
import { AssignmentsCardlistComponent } from 'src/app/shared/components/assignments-cardlist/assignments-cardlist.component';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-modal-rendre-assignment',
  templateUrl: './modal-rendre-assignment.component.html',
  styleUrls: ['./modal-rendre-assignment.component.css']
})
export class ModalRendreAssignmentComponent implements OnInit {
  nonRenduElt!: AssignmentsCardlistComponent;
  assignment!: Assignment;

  constructor(
    public dialogRef: MatDialogRef<ModalRendreAssignmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assignmentsService: AssignmentsService,
    private notification: NotificationService,
  ) { }

  ngOnInit() {
    this.nonRenduElt = this.data.nonRenduElt;
    this.assignment = this.data.assignment;
  }

  save() {
    // Effectuez les opérations nécessaires pour enregistrer la note et les remarques
    this.assignmentsService.updateAssignment(this.assignment).subscribe(resp => {
      if (this.nonRenduElt) {
        this.nonRenduElt.getAssignments();
        this.notification.showNotification("Modification enregistrée", "success");
      }
    }, error => {
      this.nonRenduElt.getAssignments();
      this.notification.showNotification("Une erreur s'est produite", "error");
    });
    this.dialogRef.close({ assignment: this.assignment });
  }

  close() {
    // Fermez la modal sans renvoyer de données
    this.dialogRef.close();
  }
}
