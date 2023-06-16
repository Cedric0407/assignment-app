import { Component } from '@angular/core';
import { Assignment } from '../../../model/assignment.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Matiere } from 'src/app/model/matiere';
import { MatieresService } from 'src/app/shared/services/matieres.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent {

  // champs du formulaire
  nomDevoir = "";
  dateDeRendu!: Date;

  infoFormGroup = this.formBuilder.group({
    nom: ['', Validators.required],
    matiereId: ['', Validators.required],

  });
  uploadFormGroup = this.formBuilder.group({
    imageFile: ['', Validators.required],
  });
  isLinear = true;
  imageFile!: any;
  matiereList: Matiere[] = [];
  isLoading = true;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private formBuilder: FormBuilder,
    private matieresService: MatieresService,
    private notification: NotificationService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.matieresService.getMatieres().subscribe(resp => {
      this.matiereList = resp;
    })
  }

  submitAssignment() {

    if (this.infoFormGroup.invalid && this.uploadFormGroup.invalid) {
      return;
    }
    this.isLoading = true;
    const matiere = this.matiereList.find(elt => elt._id === this.infoFormGroup.get('matiereId')?.value)
    const assignment = new Assignment();
    assignment.nom = this.infoFormGroup.get('nom')?.value as string,
      assignment.matiere = matiere as Matiere;
    assignment.dateDeRendu = new Date();
    assignment.auteur = this.authService.userConnected as User;

    this.assignmentsService.addAssignment(assignment as Assignment, this.imageFile).subscribe(resp => {
      this.isLoading = false;
      this.notification.showNotification("Devoir enregistrée", "success");
      this.router.navigateByUrl("assignments")
    });
  }

  onImageSelected(event: any) {
    this.imageFile = event.target.files[0];
  }
}
