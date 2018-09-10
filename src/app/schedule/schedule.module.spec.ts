import { ScheduleModule } from './schedule.module';

describe('ScheduleModule', () => {
  let bannersModule: ScheduleModule;

  beforeEach(() => {
    bannersModule = new ScheduleModule();
  });

  it('should create an instance', () => {
    expect(bannersModule).toBeTruthy();
  });
});
