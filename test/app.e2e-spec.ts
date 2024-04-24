import * as request from 'supertest';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ [GET]', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello Nest.js!');
  });
  it('/books [GET]', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(['Les 48 lois du pouvoir']);
  });
  it('/books/:id [GET][200]', () => {
    return request(app.getHttpServer())
      .get('/books/0')
      .expect(200)
      .expect('Les 48 lois du pouvoir');
  });
  it('/books/:id [GET][404]', () => {
    return request(app.getHttpServer()).get('/books/-100').expect(404);
  });
  it('/books [POST][201]', async () => {
    const newBook = "L'Art de se faire des amis";
    await request(app.getHttpServer())
      .post('/books')
      .send({
        title: newBook,
      })
      .expect(201);
    await request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(['Les 48 lois du pouvoir', newBook]);
  });
});
