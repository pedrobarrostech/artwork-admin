import { DepartmentModule } from './department.module';

describe('DepartmentModule', () => {
  let departmentsModule: DepartmentModule;

  beforeEach(() => {
    departmentsModule = new DepartmentModule();
  });

  it('should create an instance', () => {
    expect(departmentsModule).toBeTruthy();
  });
});
