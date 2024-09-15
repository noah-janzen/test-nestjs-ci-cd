import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    appService = new AppService();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appService.getHello()).toBe('Hello World!');
    });
  });
});
