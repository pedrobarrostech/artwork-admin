import { inject, TestBed } from '@angular/core/testing';

import { ScheduleService } from './schedule.service';

describe('SchedulesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleService]
    });
  });

  it('should be created', inject([ScheduleService], (service: ScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
