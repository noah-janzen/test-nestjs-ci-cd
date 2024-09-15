import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('root', () => {
    it('should return the current time', () => {
      const result = Date.now();
      jest.spyOn(appService, 'getTime').mockImplementation(() => result);

      expect(appController.getTime()).toBe(result);
      expect(appService.getTime).toHaveBeenCalled();
    });
  });
});
