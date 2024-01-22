import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSettingsResolver } from './user-settings.resolver';
import { UserSettingsService } from './user-settings.service';
import { UserSettings } from '../graphql/models/user-settings.model';
import { User } from '../graphql/models/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserSettings, User])],
  providers: [UserSettingsResolver, UserSettingsService],
})
export class UserSettingsModule {}
