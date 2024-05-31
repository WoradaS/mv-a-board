import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(username: string) {
    const userExit = await this.userRepository.findOne({ where: { username } });
    if (userExit) {
      // throw new NotAcceptableException('User already exit');
      return userExit;
    }

    const user = new User();
    user.username = username;

    return this.userRepository.save(user);
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
