import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Postgres Configs

export const localDevelopmentConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: '12345',
  database: 'dev',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true, // do not use in production, use migrations
};

export const productionConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost', // TBD
  port: 5432, // TBD
  username: 'admin', // TBD
  password: '12345', // TBD
  database: 'test',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
};
