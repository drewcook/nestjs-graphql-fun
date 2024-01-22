import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserSettings } from '../graphql/models/user-settings.model';
import { CreateUserSettingsInput } from '../graphql/inputs/create-user-settings.input';
import { UserSettingsService } from './user-settings.service';

@Resolver()
export class UserSettingsResolver {
  constructor(private userSettingsService: UserSettingsService) {}

  @Mutation((returns) => UserSettings)
  createUserSettings(
    @Args('createUserSettingsData')
    createUserSettingsData: CreateUserSettingsInput,
  ) {
    return this.userSettingsService.createUserSettings(createUserSettingsData);
  }
}
