import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ScheduleService } from '../schedule/schedule.service';
import { routerTransition } from '../core/_configs/router-transition.config';

@Component({
  animations: [ routerTransition() ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {
  schedules: any = [];
  viewDate: Date = new Date();

  constructor(
    private _scheduleService: ScheduleService
  ) { }

  getSchedules(): void {
    this._scheduleService.getData().subscribe(
      (data: any) => {
        this.schedules = data.map(schedule => {
          schedule.start = new Date(schedule.start.toMillis());
          schedule.end = new Date(schedule.end.toMillis());

          return schedule;
        });
      },
      error => console.error(error)
    );
  }

  ngOnInit(): void {
    this.getSchedules();
  }
}
