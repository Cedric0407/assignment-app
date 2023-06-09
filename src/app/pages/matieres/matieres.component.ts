import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Matiere } from 'src/app/model/matiere';
import { ModalConfirmationDeleteComponent } from 'src/app/shared/components/modal-confirmation-delete/modal-confirmation-delete.component';
import {
  MatieresService
} from 'src/app/shared/services/matieres.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent {
  matieres!: Matiere[];
  displayedColumns: string[] = ['imagePath', 'nom', 'professeur', 'action'];
  isLoading = false;
  constructor(
    public matieresService: MatieresService,
    private dialog: MatDialog,
    private notification: NotificationService

  ) { }

  ngOnInit() {

    this.getMatieres()

  }

  getMatieres() {

    this.isLoading = true;
    this.matieresService.getMatieres().subscribe(response => {
      this.matieres = response;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.notification.showNotification("Erreur serveur", "error");
    })

  }

  openModalDelete(row: Matiere) {
    this.isLoading = true;
    const dialogRef: MatDialogRef<ModalConfirmationDeleteComponent> = this.dialog.open(ModalConfirmationDeleteComponent, {
      width: '600px',
      data: {
        entity: row,
        model: 'Matiere'
      }
    });

    // Vous pouvez également écouter les événements de la modal si nécessaire
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.getMatieres()
      this.isLoading = false;
    });
  }
}
