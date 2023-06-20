import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../../model/assignment.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ROLE } from 'src/app/shared/helpers/constants';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { ModalRendreAssignmentComponent } from '../../../shared/components/modal-rendre-assignment/modal-rendre-assignment.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?: Assignment;
  isAdmin = false;
  isLoading = false;

  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // appelée avant le rendu du composant
    // on va chercher l'id dans l'url active
    // en mettant + on force la conversion en number
    const id = this.route.snapshot.params['id'];
    console.log("Dans le ngOnInit de detail, id = " + id);
    this.isLoading = true;
    // on va chercher l'assignment à afficher
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment;
        console.log("this.assignmentTransmis", this.assignmentTransmis)
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.notification.showNotification("Erreur serveur", "error");
      });

    this.authService.isAdmin().then(resp => {
      this.isAdmin = resp;
    })
  }

  onDeleteAssignment() {
    if (!this.assignmentTransmis) return;

    console.log("Suppression de l'assignment " + this.assignmentTransmis.nom);
    this.isLoading = true;
    // on demande au service la suppression de l'assignment
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        // Pour cacher le detail, on met l'assignment à null
        this.assignmentTransmis = undefined;
        this.isLoading = false;
        // et on navigue vers la page d'accueil
        this.router.navigate(["/home"]);
      }, error => {
        this.isLoading = false;
        this.notification.showNotification("Erreur serveur", "error");
      });

  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;

    this.isLoading = true;
    this.assignmentTransmis.rendu = true;

    // on appelle le service pour faire l'update
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.notification.showNotification("Erreur serveur", "error");
      });

  }

  onEditAssignment() {
    // navigation vers la page edit
    // équivalent à "/assignment/2/edit" par exemple
    // path = "/assignment/" + this.assignmentTransmis?.id + "/edit";
    // this.router.navigate([path]);
    // c'est pour vous montrer la syntaxe avec [...]
    this.router.navigate(["/assignments", this.assignmentTransmis?._id, "edit"],
      {
        queryParams: {
          nom: this.assignmentTransmis?.nom,
          matiere: "Angular"
        },
        fragment: "edition"
      });
  }

  isLogged() {
    // renvoie si on est loggé ou pas
    return this.authService.loggedIn;
  }

  get isFilePdf() {
    return this.assignmentTransmis?.filePath?.includes('pdf');
  }

  get isProf() {
    return this.authService.userRole === ROLE.professeur;
  }

  rendreAction() {
    const dialogRef: MatDialogRef<ModalRendreAssignmentComponent> = this.dialog.open(ModalRendreAssignmentComponent, {
      width: '600px',
      data: {
        assignment: { ...this.assignmentTransmis, dateDeRendu: new Date(), rendu: true },
      }
    });

    // Vous pouvez également écouter les événements de la modal si nécessaire
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.assignmentTransmis = result.assignment;
    });
  }

  back() {
    window.history.back();
  }
}
