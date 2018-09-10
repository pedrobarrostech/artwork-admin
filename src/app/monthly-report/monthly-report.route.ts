
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MonthlyReportComponent } from './monthly-report.component';
import { AuthGuard } from '../core/_guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'relatorios/:month/:year', component: MonthlyReportComponent, canActivate: [AuthGuard] }
    ])
  ]
})
export class MonthlyReportRoute { }
