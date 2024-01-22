import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { print } from 'graphql';
import {
  getUsersQuery,
  createUserMutation,
} from '../src/graphql/utils/queries';

describe('GraphQL Server (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    // Clear the database before tests
    const dataSource = app.get(DataSource);
    await dataSource.synchronize(true);
    // Start the Nest application
    await app.init();
  });

  afterAll(async () => {
    // Clear and close the database after all tests
    const dataSource = app.get(DataSource);
    if (dataSource) {
      await dataSource.dropDatabase();
      await dataSource.destroy();
    }
    // Close the Nest application
    await app.close();
  });

  describe('users', () => {
    it('should query getUsers and return 0 users', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getUsersQuery) })
        .expect((res) => {
          expect(res.body.data.getUsers).toHaveLength(0);
        });
    });

    it('should create a user using createUser mutation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(createUserMutation) })
        .expect((res) => {
          expect(res.status).toBe(200);
          expect(res.body.data.createUser).toEqual({
            id: 1,
            username: 'testUser',
            displayName: 'Test User',
          });
        });
    });

    it('should query getUsers and return the newly created user', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: print(getUsersQuery) })
        .expect((res) => {
          expect(res.body.data.getUsers).toHaveLength(1);
        });
    });
  });
});
