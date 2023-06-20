import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/shared/services/users.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalConfirmationDeleteComponent } from 'src/app/shared/components/modal-confirmation-delete/modal-confirmation-delete.component';
import { ROLE } from 'src/app/shared/helpers/constants';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users!: User[];
  displayedColumns: string[] = ['imagePath', 'name', 'email', 'role', 'action'];
  readonly role = ROLE;
  isLoading = false;

  constructor(
    public usersService: UsersService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.getUsers();

  }

  getUsers() {
    this.isLoading = true;
    this.usersService.getUsers().subscribe(response => {
      this.users = response;
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.notification.showNotification("Erreur serveur", "error");
    })
  }

  openModalDelete(row: User) {
    this.isLoading = true;
    const dialogRef: MatDialogRef<ModalConfirmationDeleteComponent> = this.dialog.open(ModalConfirmationDeleteComponent, {
      width: '600px',
      data: {
        entity: row,
        model: 'User'
      }
    });

    // Vous pouvez également écouter les événements de la modal si nécessaire
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.getUsers()
      this.isLoading = false;
    });
  }



}
