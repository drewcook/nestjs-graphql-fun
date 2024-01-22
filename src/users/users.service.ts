import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from '../graphql/inputs/create-user.input';
import { User } from '../graphql/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  createUser(createUserData: CreateUserInput) {
    const newUser = this.usersRepo.create(createUserData);
    return this.usersRepo.save(newUser);
  }

  getUsers() {
    return this.usersRepo.find();
  }

  getUserById(id: number) {
    return this.usersRepo.findOneBy({ id });
  }
}
