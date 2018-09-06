import { SectionModule } from './section.module';

describe('SectionModule', () => {
  let sectionsModule: SectionModule;

  beforeEach(() => {
    sectionsModule = new SectionModule();
  });

  it('should create an instance', () => {
    expect(sectionsModule).toBeTruthy();
  });
});
