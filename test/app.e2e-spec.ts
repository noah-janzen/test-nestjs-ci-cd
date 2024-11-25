import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from './../src/app.module';
import { getData, getError } from './transformations';
import { validateNumber, validateString } from './validations';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const currentTime = Date.now();

    const response = await request(app.getHttpServer() as App)
      .get('/')
      .expect(200);

    const timeReturned = getData(response.text);
    validateNumber(timeReturned);

    // timeReturned should be a 13-digit number
    expect(timeReturned.toString().length).toBe(13);

    expect(timeReturned).toBeGreaterThanOrEqual(currentTime - 1_000);
    expect(timeReturned).toBeLessThanOrEqual(currentTime + 1_000);
  });

  it('/greet?name=John (GET)', async () => {
    const name = 'John';
    const response = await request(app.getHttpServer() as App)
      .get(`/greet?name=${name}`)
      .expect(200);

    const greeting = getData(response.text);
    validateString(greeting);

    expect(greeting).toBe(`Hello, ${name}!`);
  });

  it('/randomNumber (GET)', async () => {
    const response = await request(app.getHttpServer() as App)
      .get('/randomNumber')
      .expect(200);

    const randomNumber = getData(response.text);
    validateNumber(randomNumber);

    expect(randomNumber).toBeGreaterThanOrEqual(0);
    expect(randomNumber).toBeLessThanOrEqual(100);
  });

  it('/register-person (POST) - valid input', async () => {
    const validPerson = {
      firstName: 'John',
      lastName: 'Doe',
    };

    const response = await request(app.getHttpServer() as App)
      .post('/register-person')
      .send(validPerson)
      .expect(200);

    expect(response.body).toEqual({});
  });

  it('/register-person (POST) - missing fields', async () => {
    const missingLastName = {
      firstName: 'John',
    };

    const response = await request(app.getHttpServer() as App)
      .post('/register-person')
      .send(missingLastName)
      .expect(400);

    const error = getError(response.text);

    expect(error.descriptionCode).toBe('REQUEST_VALIDATION_ERROR');
    expect(error.message).toBe('Request validation failed');
    expect(error.path).toBe('/register-person');
  });
});
