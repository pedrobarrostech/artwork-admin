import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { DepartmentComponent } from './department.component';
import { DepartmentRoute } from './department.route';
import { DepartmentService } from './department.service';

@NgModule({
  imports: [
    CoreModule,
    DepartmentRoute
  ],
  declarations: [DepartmentComponent],
  providers: [
    DepartmentService
  ]
})
export class DepartmentModule { }
