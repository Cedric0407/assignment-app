import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../shared/services/auth.guard';

import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: AssignmentsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'home',
        component: AssignmentsComponent,
        canActivate: [authGuard]
      },
      {
        path: 'add',
        component: AddAssignmentComponent,
        canActivate: [authGuard]
      },
      {
        path: 'assignments/:id',
        component: AssignmentDetailComponent,
        canActivate: [authGuard]
      },
      {
        path: 'assignments/:id/edit',
        component: EditAssignmentComponent,
        canActivate: [authGuard]
      }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
