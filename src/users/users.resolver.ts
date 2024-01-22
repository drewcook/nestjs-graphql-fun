import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../graphql/models/user.model';
import { UserSettings } from '../graphql/models/user-settings.model';
import { CreateUserInput } from '../graphql/inputs/create-user.input';
import { UsersService } from './users.service';
import { UserSettingsService } from '../user-settings/user-settings.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private userSettingsService: UserSettingsService,
  ) {}

  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.usersService.createUser(createUserData);
  }

  @Query(() => [User])
  getUsers() {
    return this.usersService.getUsers();
  }

  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.getUserById(id);
  }

  // Get a nested field that relates to the parent type
  @ResolveField((returns) => UserSettings, { name: 'settings', nullable: true })
  getUserSettings(@Parent() user: User) {
    return this.userSettingsService.getUserSettingsById(user.id);
  }
}
