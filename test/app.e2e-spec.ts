import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestLogger } from './testlogger';
import { AppModule } from '../src/modules/app/app.module';
import { Connection } from 'typeorm';
import { UserEntityTypeORM } from 'src/modules/user/infrastructure/typeorm/user.entity';

describe('AppModule (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useLogger(new TestLogger());
    connection = app.get(Connection);
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  beforeEach(async () => {
    await connection.synchronize(true);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('UsersModule', () => {
    let mockUsers = [];

    beforeEach(async () => {
      mockUsers = [
        {
          id: '213123',
          firstName: 'foo',
          lastName: 'bar',
          username: 'foobar',
          email: 'foo@bar.baz',
          password: '1234',
        },
      ];
      try {
        await connection.getRepository(UserEntityTypeORM).save(mockUsers);
      } catch (e) {
        console.error(e);
      }
    });

    it('/users (GET)', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect(mockUsers);
    });
  });
});
