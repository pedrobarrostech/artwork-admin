
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DepartmentComponent } from './department.component';
import { AuthGuard } from '../core/_guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'servicos', component: DepartmentComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class DepartmentRoute { }
