import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { Assignment } from '../../../model/assignment.model';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment = {} as Assignment;

  isLoading = false;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    try {
      this.getAssignment();
    } catch (error) {
      this.isLoading = false;
      this.notification.showNotification("Erreur serveur", "error");
    }

  }
  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    // const id = +this.route.snapshot.params['id'];
    const id = this.route.snapshot.params['id'];

    // Exemple de récupération des query params (après le ? dans l'url)
    const queryParams = this.route.snapshot.queryParams;
    console.log(queryParams);
    console.log("nom :" + queryParams['nom'])
    console.log("matière :" + queryParams['matiere'])

    // Exemple de récupération du fragment (après le # dans l'url)
    const fragment = this.route.snapshot.fragment;
    console.log("Fragment = " + fragment);

    this.isLoading = true;
    this.assignmentsService.getAssignment(id)
      .subscribe((assignment) => {
        if (!assignment) return;
        this.assignment = assignment;
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.notification.showNotification("Erreur serveur", "error");
      });

  }

  onSaveAssignment() {
    if (!this.assignment) return;
    this.isLoading = true;
    if (!this.assignment.rendu) {
      this.assignment.note = undefined
      this.assignment.remarques = undefined
    }

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        this.isLoading = false;
        this.notification.showNotification('Modification effectuée.', 'succes');
        // navigation vers la home page
        this.router.navigate(['/assignments']);
      }, err => {
        this.isLoading = false;
        this.notification.showNotification('Une erreur s\est survenue.', 'error');
      });

  }

  cancel() {
    window.history.back();
  }
}
