import { ReportModule } from './monthly-report.module';

describe('ReportModule', () => {
  let bannersModule: ReportModule;

  beforeEach(() => {
    bannersModule = new ReportModule();
  });

  it('should create an instance', () => {
    expect(bannersModule).toBeTruthy();
  });
});
