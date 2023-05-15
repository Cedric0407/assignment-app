import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent {
  @Input()
  assignmentTransmis?:Assignment;
  @Output()
  deleteAssignment = new EventEmitter();

  constructor(private assignmentsService:AssignmentsService) { }

  onDeleteAssignment() {
    if(!this.assignmentTransmis) return;

    console.log("Suppression de l'assignment " + this.assignmentTransmis.nom);
  
    // On émet l'événement deleteAssignment
    this.deleteAssignment.emit();

    // Pour cacher le detail, on met l'assignment à null
    this.assignmentTransmis = undefined;
  }

  onAssignmentRendu() { 
    if(!this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;

    // on appelle le service pour faire l'update
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
    });
  }
}
