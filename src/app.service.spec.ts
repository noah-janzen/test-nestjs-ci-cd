import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    appService = new AppService();
  });

  describe('getTime', () => {
    it('should return the current time', () => {
      const mockedCurrentTime = 1726421185583;

      // Mock Date.now() to return a consistent time
      jest.spyOn(Date, 'now').mockReturnValue(mockedCurrentTime);

      expect(appService.getTime()).toBe(mockedCurrentTime);

      // Restore Date.now() after the test to avoid unexpected behavior in other tests
      jest.spyOn(Date, 'now').mockRestore();
    });

    it('should return a greeting', () => {
      const name = 'Noah';
      const result = `Hello, ${name}!`;

      expect(appService.greet(name)).toBe(result);
    });
  });
});
