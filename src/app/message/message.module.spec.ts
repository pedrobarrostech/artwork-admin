import { MessageModule } from './message.module';

describe('MessageModule', () => {
  let bannersModule: MessageModule;

  beforeEach(() => {
    bannersModule = new MessageModule();
  });

  it('should create an instance', () => {
    expect(bannersModule).toBeTruthy();
  });
});
