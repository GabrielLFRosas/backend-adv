import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CreateUserDto } from './DTO/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guards/auth-guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
