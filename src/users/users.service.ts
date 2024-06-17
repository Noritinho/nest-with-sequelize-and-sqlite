import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    this.userModel.create({ name, email, password });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findById(id: number): Promise<User | null> {
    const user = this.userModel.findOne({ where: { id } });
    return user;
  }

  findByName(name: string): Promise<User[]> {
    const user = this.userModel.findAll({ where: { name } });
    return user;
  }

  findByEmail(email: string): Promise<User | null> {
    const user = this.userModel.findOne({ where: { email } });
    return user;
  }

  updateById(id: number, updateUserDto: CreateUserDto) {
    const user = this.userModel.update(
      {
        name: updateUserDto.name,
        email: updateUserDto.email,
        password: updateUserDto.password,
      },
      { where: { id } },
    );

    return user;
  }

  removeById(id: number) {
    this.userModel.destroy({ where: { id } });
  }
}
