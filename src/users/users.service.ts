import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  find(email: string) {
    return this.usersRepository.find({
      where: {
        email,
      },
    });
  }

  findOneBy(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  create(name: string, email: string, password: string) {
    const user = this.usersRepository.create({ name, email, password });
    return this.usersRepository.save(user);
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOneBy(id);
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, attrs);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOneBy(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.usersRepository.remove(user);
  }
}
