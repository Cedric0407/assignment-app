import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Matiere } from 'src/app/model/matiere';
import { ModalConfirmationDeleteComponent } from 'src/app/shared/components/modal-confirmation-delete/modal-confirmation-delete.component';
import {
  MatieresService
} from 'src/app/shared/services/matieres.service';
@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent {
  matieres!: Matiere[];
  displayedColumns: string[] = ['imagePath', 'nom', 'professeur', 'action'];

  constructor(
    public matieresService: MatieresService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getMatieres()
  }

  getMatieres() {
    this.matieresService.getMatieres().subscribe(response => {
      this.matieres = response;
    })
  }

  openModalDelete(row: Matiere) {
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
    });
  }
}
