import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';

import { DialogModule } from '@angular/cdk/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { PagesComponent } from './pages.component';
import { AssignmentsDatalistComponent } from '../shared/components/assignments-datalist/assignments-datalist.component';
import { AssignmentsCardlistComponent } from '../shared/components/assignments-cardlist/assignments-cardlist.component';
import { AssignmentsVirtualscrollingComponent } from '../shared/components/assignments-virtualscrolling/assignments-virtualscrolling.component';
import { ModalRendreAssignmentComponent } from '../shared/components/modal-rendre-assignment/modal-rendre-assignment.component';
import { MatieresComponent } from './matieres/matieres.component';
import { UsersComponent } from './users/users.component';
import { AddMatiereComponent } from './matieres/add-matiere/add-matiere.component';
import { EditMatiereComponent } from './matieres/edit-matiere/edit-matiere.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ModalConfirmationDeleteComponent } from '../shared/components/modal-confirmation-delete/modal-confirmation-delete.component';

@NgModule({
  declarations: [
    AssignmentsComponent,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    PagesComponent,
    AssignmentsDatalistComponent,
    AssignmentsCardlistComponent,
    AssignmentsVirtualscrollingComponent,
    ModalRendreAssignmentComponent,
    MatieresComponent,
    UsersComponent,
    AddMatiereComponent,
    EditMatiereComponent,
    EditUserComponent,
    AddUserComponent,
    ModalConfirmationDeleteComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    PagesRoutingModule,
    MatNativeDateModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatInputModule, MatFormFieldModule, MatDatepickerModule,
    MatListModule, MatCardModule, MatCheckboxModule, MatSlideToggleModule,
    MatTableModule, MatPaginatorModule, MatTabsModule, MatSidenavModule, MatToolbarModule,
    MatMenuModule, MatDialogModule, MatSelectModule, MatStepperModule, MatGridListModule,
    ScrollingModule, DragDropModule, DialogModule,
  ]
})
export class PagesModule { }
