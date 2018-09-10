import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CoreModule } from '../core/core.module';
import { HomeComponent } from './home.component';
import { HomeRoute } from './home.route';
@NgModule({
  imports: [
    CoreModule,
    HomeRoute,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
