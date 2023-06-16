import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Matiere } from 'src/app/model/matiere';
import { MatieresService } from 'src/app/shared/services/matieres.service';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/shared/services/users.service';
import { ROLE } from 'src/app/shared/helpers/constants';
@Component({
  selector: 'app-edit-matiere',
  templateUrl: './edit-matiere.component.html',
  styleUrls: ['./edit-matiere.component.css']
})
export class EditMatiereComponent {
  imageFile!: any;
  isLoading = false;
  matiereForm!: FormGroup;
  professeurList!: User[];
  _id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private matieresService: MatieresService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService,
    private usersService: UsersService,

  ) { }

  ngOnInit() {

    this.matiereForm = this.formBuilder.group({
      nom: ['', Validators.required],
      profId: ['', Validators.required],
      imageFile: ['']
    });

    this._id = this.route.snapshot.params['id'];

    this.usersService.getUsers().subscribe(resp => {
      this.professeurList = resp.filter((elt: User) => elt.role === ROLE.professeur);
      this.initData();
    })
  }

  initData() {
    this.matieresService.getMatiere(this._id).subscribe(rep => {
      const value = { nom: rep.nom, profId: rep.professeur._id };
      console.log(value)
      this.matiereForm.patchValue(value);
    })
  }

  onSubmit() {
    if (this.matiereForm.invalid) {
      return;
    }
    this.isLoading = true;
    const professeur = this.professeurList.find(elt => elt._id === this.matiereForm.get('profId')?.value)
    const matiere = {
      _id: this._id,
      nom: this.matiereForm.get('nom')?.value,
      professeur,
    }
    this.matieresService.updateMatiere(matiere as Matiere, this.imageFile).subscribe(resp => {
      this.isLoading = false;
      this.notification.showNotification("Maitère enregistrée", "success");
      this.router.navigateByUrl("matieres")
    });

  }

  onImageSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  cancel() {
    window.history.back();
  }
}
