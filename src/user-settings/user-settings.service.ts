import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserSettingsInput } from '../graphql/inputs/create-user-settings.input';
import { UserSettings } from '../graphql/models/user-settings.model';
import { User } from '../graphql/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSettings)
    private userSettingsRepo: Repository<UserSettings>,
    @InjectRepository(User) private usersRepo: Repository<User>,
  ) {}

  getUserSettingsById(userId: number) {
    return this.userSettingsRepo.findOneBy({ userId });
  }

  async createUserSettings(createUserSettingsData: CreateUserSettingsInput) {
    // Check that user exists
    const findUser = await this.usersRepo.findOneBy({
      id: createUserSettingsData.userId,
    });
    if (!findUser) throw new NotFoundException('User not found');

    // Create new user settings record
    const newUserSettings = this.userSettingsRepo.create(
      createUserSettingsData,
    );
    const savedSettings = await this.userSettingsRepo.save(newUserSettings);

    // Update the user record with the new settings
    findUser.settings = savedSettings;
    await this.usersRepo.save(findUser);

    return savedSettings;
  }
}
