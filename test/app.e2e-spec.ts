import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TestLogger } from './testlogger';
import { AppModule } from '../src/modules/app/app.module';
import { Connection } from 'typeorm';
import { UserEntityTypeORM } from 'src/modules/user/infrastructure/typeorm/user.entity';
import { CreateUserDto } from 'src/modules/user/interface/dtos/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/interface/dtos/update-user.dto';

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
    const id = '213dosad213';
    let mockUsers: UserEntityTypeORM[] = [];

    beforeEach(async () => {
      mockUsers = [
        new UserEntityTypeORM({
          id,
          firstName: 'foo',
          lastName: 'bar',
          username: 'foobar',
          email: 'foo@bar.baz',
          createdAt: new Date(),
          updatedAt: new Date(),
          password: {
            encrypted: '213123',
            salt: '21312',
            createdAt: new Date(),
            comparedAt: new Date(),
          },
        }),
      ];
      try {
        await connection.getRepository(UserEntityTypeORM).save(mockUsers);
      } catch (e) {
        console.error(e);
        throw e;
      }
    });

    it('/users (GET)', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .then((res) => {
          expect(res.body.length).toEqual(mockUsers.length);
        });
    });

    it('/users (POST)', async () => {
      const payload: CreateUserDto = {
        firstName: 'foo',
        lastName: 'bar',
        email: 'foo@bar',
        username: 'fooBar',
        password: '1234',
      };
      await request(app.getHttpServer())
        .post('/users')
        .send(payload)
        .expect(201);
      await request(app.getHttpServer())
        .get('/users')
        .then((res) => {
          expect(res.body.length).toEqual(mockUsers.length + 1);
        });
    });

    it('/users/:id (GET)', () => {
      return request(app.getHttpServer())
        .get(`/users/${id}`)
        .expect(200)
        .then((res) => {
          expect(res.body.id).toEqual(id);
        });
    });

    it('/users/:id (PUT)', async () => {
      const payload: UpdateUserDto = {
        firstName: 'foofoo',
      };

      await request(app.getHttpServer())
        .put(`/users/${id}`)
        .send(payload)
        .expect(200);

      await request(app.getHttpServer())
        .get(`/users/${id}`)
        .expect(200)
        .then((res) => {
          res.body.firstName = payload.firstName;
        });
    });

    it('/users/:id (DELETE)', async () => {
      await request(app.getHttpServer()).delete(`/users/${id}`).expect(200);

      await request(app.getHttpServer())
        .get(`/users`)
        .expect(200)
        .then((res) => {
          res.body = [];
        });
    });
  });
});
