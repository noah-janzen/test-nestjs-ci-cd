import { ZodError } from 'zod';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(() => {
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

    it('should return a greeting', () => {
      const name = 'Noah';
      const result = `Hello, ${name}!`;
      jest.spyOn(appService, 'greet').mockImplementation(() => result);

      expect(appController.greet(name)).toBe(result);
      expect(appService.greet).toHaveBeenCalledWith(name);
    });

    it('should return a random number', () => {
      const result = 5;
      jest
        .spyOn(appService, 'getRandomNumber')
        .mockImplementation(() => result);

      expect(appController.randomNumber()).toBe(result);
      expect(appService.getRandomNumber).toHaveBeenCalled();
    });
  });

  describe('registerPerson', () => {
    it('should register a person', () => {
      const person = { firstName: 'John', lastName: 'Doe' };
      jest.spyOn(appService, 'registerPerson').mockImplementation(() => person);

      const result = appController.registerPerson(person);

      expect(appService.registerPerson).toHaveBeenCalledWith(person);
      expect(result).toEqual(undefined);
    });

    it('should throw an error if the person is missing lastName', () => {
      const person = { firstName: 'John' };

      expect(() => appController.registerPerson(person)).toThrow(ZodError);
    });

    it('should throw an error if the person is missing firstName', () => {
      const person = { lastName: 'Doe' };

      expect(() => appController.registerPerson(person)).toThrow(ZodError);
    });

    it("should throw an error if the person's firstName has less than 3 letters", () => {
      const person = { firstName: 'Jo', lastName: 'Doe' };

      expect(() => appController.registerPerson(person)).toThrow(ZodError);
    });

    it("should throw an error if the person's lastName has less than 3 letters", () => {
      const person = { firstName: 'Jon', lastName: 'Ab' };

      expect(() => appController.registerPerson(person)).toThrow(ZodError);
    });
  });

  describe('findEvents', () => {
    it('should return a list of events', () => {
      const page = 2;
      const size = 6;
      const result = [6, 7, 8, 9, 10, 11];
      jest.spyOn(appService, 'findEvents').mockImplementation(() => result);

      const indexes = appController.findEvents({ page, size });

      expect(appService.findEvents).toHaveBeenCalledWith({ page, size });
      expect(indexes).toEqual({ indexes: result });
    });
  });
});
