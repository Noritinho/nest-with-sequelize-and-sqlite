import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

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
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get('/id/:id')
  findUSerById(@Param('id') params: number) {
    return this.usersService.findUSerById(params);
  }

  @Get('/name/:name')
  findUsersByName(@Param('name') params: string) {
    return this.usersService.findUsersByName(params);
  }

  @Get('/email/:email')
  findUserByEmail(@Param('email') params: string) {
    return this.usersService.findUserByEmail(params);
  }

  @Put(':id')
  updateUserById(
    @Param('id') params: number,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.updateUserById(params, createUserDto);
  }

  @Delete(':id')
  deleteUserById(@Param('id') params: number) {
    return this.usersService.deleteUserById(params);
  }
}
