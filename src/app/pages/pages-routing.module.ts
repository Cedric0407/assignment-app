import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../shared/services/auth.guard';

import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { PagesComponent } from './pages.component';
import { EditMatiereComponent } from './matieres/edit-matiere/edit-matiere.component';
import { AddMatiereComponent } from './matieres/add-matiere/add-matiere.component';
import { MatieresComponent } from './matieres/matieres.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: AssignmentsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'assignments',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            component: AssignmentsComponent,
            canActivate: [authGuard]
          },
          {
            path: 'add',
            component: AddAssignmentComponent,
            canActivate: [authGuard]
          },
          {
            path: ':id',
            component: AssignmentDetailComponent,
            canActivate: [authGuard]
          },
          {
            path: ':id/edit',
            component: EditAssignmentComponent,
            canActivate: [authGuard]
          }
        ]
      },
      {
        path: 'users',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            component: UsersComponent,
            canActivate: [authGuard]
          },
          {
            path: 'add',
            component: AddUserComponent,
            canActivate: [authGuard]
          },
          {
            path: ':id/edit',
            component: EditUserComponent,
            canActivate: [authGuard]
          }
        ]
      },
      {
        path: 'matieres',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            component: MatieresComponent,
            canActivate: [authGuard]
          },
          {
            path: 'add',
            component: AddMatiereComponent,
            canActivate: [authGuard]
          },
          {
            path: ':id/edit',
            component: EditMatiereComponent,
            canActivate: [authGuard]
          }
        ]
      }

    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
