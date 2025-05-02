import { Body, Controller, ForbiddenException, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth-guard';

import { CreateUserDto } from './DTO/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: CreateUserDto,  @Request() req: any) {
    const requestingUser = req.user;
    if (data.role === 'ADMIN' && requestingUser.role !== 'ADMIN') {
      throw new ForbiddenException('Apenas administradores podem criar outros administradores.');
    }
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
