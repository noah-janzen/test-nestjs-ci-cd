import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(() => {
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

    it('should return a random number', () => {
      const mockedRandomNumber = 55;

      // Mock Math.random() to return a consistent number
      jest.spyOn(Math, 'random').mockReturnValue(0.55);

      expect(appService.getRandomNumber()).toBe(mockedRandomNumber);
      expect(Math.random).toHaveBeenCalled();
    });
  });

  describe('registerPerson', () => {
    it('should return the person being registered', () => {
      const person = { firstName: 'John', lastName: 'Doe' };

      const result = appService.registerPerson(person);

      expect(result).toEqual(person);
    });
  });

  describe('findEvents', () => {
    it('should return the correct indexes', () => {
      const page = 2;
      const size = 5;

      const result = appService.findEvents({ page, size });

      expect(result).toEqual([5, 6, 7, 8, 9]);
    });
  });
});
