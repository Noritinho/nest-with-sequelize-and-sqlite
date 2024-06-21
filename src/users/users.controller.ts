import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { error } from 'console';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @HttpCode(200)
  async findAllUsers() {
    try {
      return await this.usersService.findAllUsers();
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Unable to list users',
        },
        HttpStatus.FORBIDDEN,
        { cause: error },
      );
    }
  }

  @Get('/id/:id')
  @HttpCode(200)
  async findUSerById(@Param('id') params: number) {
    const user = await this.usersService.findUSerById(params);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  @Get('/name/:name')
  @HttpCode(200)
  async findUsersByName(@Param('name') params: string) {
    const user = await this.usersService.findUsersByName(params);
    const checkIfUserExists = await this.usersService.findUserByName(params);

    if (!checkIfUserExists) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  @Get('/email/:email')
  @HttpCode(200)
  async findUserByEmail(@Param('email') params: string) {
    const user = await this.usersService.findUserByEmail(params);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  @Put('/id/:id')
  @HttpCode(201)
  async updateUserById(
    @Param('id') params: number,
    @Body() createUserDto: CreateUserDto,
  ) {
    const user = await this.usersService.updateUserById(params, createUserDto);

    const checkIfUserExists = await this.findUSerById(params);
    const checkIfEmailExists = await this.findUserByEmail(createUserDto.email);

    if (!checkIfUserExists) {
      throw new HttpException('User not found', 404);
    }

    if (checkIfEmailExists) {
      throw new HttpException('Email already in use', 409);
    }
    return user;
  }

  @Delete('/id/:id')
  @HttpCode(204)
  async deleteUserById(@Param('id') params: number) {
    const checkIfUserExists = await this.findUSerById(params);

    if (!checkIfUserExists) {
      throw new HttpException('User not found', 404);
    }

    const user = await this.usersService.deleteUserById(params);

    return user;
  }
}
