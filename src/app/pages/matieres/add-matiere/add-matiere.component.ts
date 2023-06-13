import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Matiere } from 'src/app/model/matiere';
import { MatieresService } from 'src/app/shared/services/matieres.service';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/shared/services/users.service';
import { ROLE } from 'src/app/shared/helpers/constants';
@Component({
  selector: 'app-add-matiere',
  templateUrl: './add-matiere.component.html',
  styleUrls: ['./add-matiere.component.css']
})
export class AddMatiereComponent {
  imageFile!: any;
  isLoading = false;
  matiereForm!: FormGroup;
  professeurList!: User[];

  constructor(
    private formBuilder: FormBuilder,
    private matieresService: MatieresService,
    private route: Router,
    private notification: NotificationService,
    private usersService: UsersService,

  ) { }

  ngOnInit() {
    this.matiereForm = this.formBuilder.group({
      nom: ['', Validators.required],
      profId: ['', Validators.required],
      imageFile: ['', Validators.required]
    });

    this.usersService.getUsers().subscribe(resp => {
      this.professeurList = resp.filter((elt: User) => elt.role === ROLE.professeur);
    })
  }

  onSubmit() {
    if (this.matiereForm.invalid) {
      return;
    }
    this.isLoading = true;
    const professeur = this.professeurList.find(elt => elt._id === this.matiereForm.get('profId')?.value)
    const matiere = {
      nom: this.matiereForm.get('nom')?.value,
      professeur,
    }
    this.matieresService.addMatiere(matiere as Matiere, this.imageFile).subscribe(resp => {
      this.isLoading = false;
      this.notification.showNotification("Maitère enregistrée", "success");
      this.route.navigateByUrl("matieres")
    });

  }

  onImageSelected(event: any) {
    this.imageFile = event.target.files[0];
  }
}
