import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from './../src/app.module';

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

    const timeReturned = response.text;

    expect(typeof timeReturned).toBe('string');

    // timeReturned should be a 13-digit number
    const timePattern = /^\d{13}$/;
    expect(timePattern.test(timeReturned)).toBe(true);

    expect(parseInt(timeReturned)).toBeGreaterThanOrEqual(currentTime - 1_000);
    expect(parseInt(timeReturned)).toBeLessThanOrEqual(currentTime + 1_000);
  });

  it('/greet?name=John (GET)', async () => {
    const name = 'John';
    const response = await request(app.getHttpServer() as App)
      .get(`/greet?name=${name}`)
      .expect(200);

    expect(response.text).toBe(`Hello, ${name}!`);
  });

  it('/randomNumber (GET)', async () => {
    const response = await request(app.getHttpServer() as App)
      .get('/randomNumber')
      .expect(200);

    const randomNumber = parseInt(response.text);

    expect(typeof randomNumber).toBe('number');
    expect(randomNumber).toBeGreaterThanOrEqual(0);
    expect(randomNumber).toBeLessThanOrEqual(100);
  });
});
