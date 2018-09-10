import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { ScheduleComponent } from './schedule.component';
import { ScheduleRoute } from './schedule.route';
import { ScheduleService } from './schedule.service';
@NgModule({
  imports: [
    CoreModule,
    ScheduleRoute
  ],
  declarations: [ScheduleComponent],
  providers: [ScheduleService]
})
export class ScheduleModule { }
