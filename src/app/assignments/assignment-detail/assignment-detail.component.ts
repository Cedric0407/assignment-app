import { Component, EventEmitter, Input} from '@angular/core';
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

  constructor(private assignmentsService:AssignmentsService) { }

  onDeleteAssignment() {
    if(!this.assignmentTransmis) return;

    console.log("Suppression de l'assignment " + this.assignmentTransmis.nom);
  
    // on demande au service la suppression de l'assignment
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
    .subscribe(message => {
      console.log(message);
       // Pour cacher le detail, on met l'assignment à null
      this.assignmentTransmis = undefined;
    });
   
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
