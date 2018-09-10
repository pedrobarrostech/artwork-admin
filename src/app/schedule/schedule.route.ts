
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScheduleComponent } from './schedule.component';
import { AuthGuard } from '../core/_guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'horarios/:clientId', component: ScheduleComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class ScheduleRoute { }
