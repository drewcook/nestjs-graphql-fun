import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './graphql/models/user.model';
import { UserSettings } from './graphql/models/user-settings.model';
import { UsersModule } from './users/users.module';
import { UserSettingsModule } from './user-settings/user-settings.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: '12345',
      database: process.env.NODE_ENV === 'test' ? 'dev' : 'dev',
      entities: [User, UserSettings],
      synchronize: true,
    }),
    UsersModule,
    UserSettingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
