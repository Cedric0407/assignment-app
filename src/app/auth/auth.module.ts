import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';


@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent
  ],
  imports: [
    CommonModule, FormsModule,
    AuthRoutingModule,
    MatInputModule, MatFormFieldModule, MatButtonModule, MatProgressBarModule
  ]
})
export class AuthModule { }
