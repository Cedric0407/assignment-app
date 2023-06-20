import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  imageFile!: any;
  isLoading = false;
  userForm!: FormGroup;
  passwordsDoNotMatch = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private route: Router,
    private notification: NotificationService,

  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      imageFile: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
    this.userForm.setValidators(this.passwordMatchValidator);
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    this.isLoading = true;
    const user = {
      email: this.userForm.get('email')?.value,
      nom: this.userForm.get('name')?.value,
      role: this.userForm.get('role')?.value
    }
    this.usersService.addUser(user as User, this.imageFile, this.userForm.get('password')?.value).subscribe(resp => {
      this.isLoading = false;
      this.notification.showNotification("Utilisateur enregistré", "success");
      this.route.navigateByUrl("users")
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
