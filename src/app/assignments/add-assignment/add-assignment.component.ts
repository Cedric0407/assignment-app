import { Component, EventEmitter, Output } from '@angular/core';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {
  // champs du formulaire
  nomDevoir = "";
  dateDeRendu!: Date;
  @Output()
  nouvelAssignment = new EventEmitter<Assignment>();

  onSubmit(event: any) {
    // On vérifie que les champs ne sont pas vides
    if (this.nomDevoir === "") return;
    if (this.dateDeRendu === undefined) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nomDevoir;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;

    //this.assignments.push(nouvelAssignment);
    // On envoie l'assignment qu'on vient de créer
    // attaché à un événement de nom "nouvelAssignment"
    // Remarque : ici, dans ce composant, le même nom
    // est aussi l'emmeteur de l'événement
    this.nouvelAssignment.emit(nouvelAssignment);
  }
}
