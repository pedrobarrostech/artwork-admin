import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { MonthlyReportComponent } from './monthly-report.component';
import { MonthlyReportRoute } from './monthly-report.route';
import { MonthlyReportService } from './monthly-report.service';
@NgModule({
  imports: [
    CoreModule,
    MonthlyReportRoute
  ],
  declarations: [MonthlyReportComponent],
  providers: [MonthlyReportService]
})
export class MonthlyReportModule { }
