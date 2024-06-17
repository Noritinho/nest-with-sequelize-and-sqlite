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
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/id/:id')
  findById(@Param('id') params: number) {
    return this.usersService.findById(params);
  }

  @Get('/name/:name')
  findByName(@Param('name') params: string) {
    return this.usersService.findByName(params);
  }

  @Get('/email/:email')
  findByEmail(@Param('email') params: string) {
    return this.usersService.findByEmail(params);
  }

  @Put(':id')
  async updateById(
    @Param('id') params: number,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.updateById(params, createUserDto);
  }

  @Delete(':id')
  removeById(@Param('id') params: number) {
    return this.usersService.removeById(params);
  }
}
