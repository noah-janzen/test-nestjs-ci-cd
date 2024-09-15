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
    it('should return "Hello World!"', () => {
      const result = 'Hello World!';
      jest.spyOn(appService, 'getHello').mockImplementation(() => result);

      expect(appController.getHello()).toBe(result);
      expect(appService.getHello).toHaveBeenCalled();
    });
  });
});
