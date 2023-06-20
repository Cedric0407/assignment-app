import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  imageFile!: any;
  isLoading = false;
  userForm!: FormGroup;
  passwordsDoNotMatch = false;
  _id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService,

  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      imageFile: [''],
      role: ['', Validators.required],
      password: [''],
      confirmPassword: ['']
    });
    this.userForm.setValidators(this.passwordMatchValidator);
    this._id = this.route.snapshot.params['id'];

    this.initData();

  }

  initData() {
    this.isLoading = true;
    this.usersService.getUser(this._id).subscribe(rep => {
      const value = { email: rep.email, name: rep.nom, role: rep.role };
      this.userForm.patchValue(value);
      this.isLoading = false;
    }, error => {
      this.isLoading = false;
      this.notification.showNotification("Erreur serveur", "error");
    })
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    this.isLoading = true;
    const user = {
      _id: this._id,
      email: this.userForm.get('email')?.value,
      nom: this.userForm.get('name')?.value,
      role: this.userForm.get('role')?.value
    }
    this.usersService.updateUser(user as User, this.imageFile, this.userForm.get('password')?.value).subscribe(resp => {
      this.isLoading = false;
      this.notification.showNotification("Utilisateur enregistré", "success");
      this.router.navigateByUrl("users")
    }, error => {
      this.isLoading = false;
      this.notification.showNotification("Erreur serveur", "error");
    });


  }

  onImageSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      // this.passwordsDoNotMatch = true;
      control.get('confirmPassword')?.setErrors({ 'passwordsDoNotMatch': true });
    } else {
      // this.passwordsDoNotMatch = false;
      control.get('confirmPassword')?.setErrors(null);
    }

    return null;
  }

  cancel() {
    window.history.back();
  }
}
