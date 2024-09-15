import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    appService = new AppService();
  });

  describe('getTime', () => {
    it('should return the current time', () => {
      expect(appService.getTime()).toBe(Date.now());
    });
  });
});
