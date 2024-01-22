import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../graphql/models/user.model';
import { UserSettingsService } from '../user-settings/user-settings.service';
import { UserSettings } from '../graphql/models/user-settings.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSettings])],
  providers: [UsersResolver, UsersService, UserSettingsService],
})
export class UsersModule {}
