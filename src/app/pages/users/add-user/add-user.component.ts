import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      role: ['', Validators.required]
    });
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
    this.usersService.addUser(user as User, this.imageFile).subscribe(resp => {
      this.isLoading = false;
      this.notification.showNotification("Utilisateur enregistré", "success");
      this.route.navigateByUrl("users")
    });

  }

  onImageSelected(event: any) {
    this.imageFile = event.target.files[0];
  }
}
