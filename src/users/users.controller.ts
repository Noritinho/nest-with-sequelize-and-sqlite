import { Controller, Get, Post, Param, Body } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): string {
    return 'This action Returns all Users';
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action Returns a ${params.id} User`;
  }
}
