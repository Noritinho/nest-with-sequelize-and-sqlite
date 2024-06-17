import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  create(user: CreateUserDto): Promise<User> {
    return this.userModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }

  findAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findUSerById(id: number): Promise<User | null> {
    return this.userModel.findOne({ where: { id } });
  }

  findUsersByName(name: string): Promise<User[]> {
    return this.userModel.findAll({ where: { name } });
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ where: { email } });
  }

  updateUserById(id: number, user: CreateUserDto) {
    return this.userModel.update(
      {
        name: user.name,
        email: user.email,
        password: user.password,
      },
      { where: { id } },
    );
  }

  deleteUserById(id: number): Promise<number> {
    return this.userModel.destroy({ where: { id } });
  }
}
