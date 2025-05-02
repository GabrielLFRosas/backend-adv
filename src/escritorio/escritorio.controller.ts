import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CreateEscritorioDto } from './DTO/create-escritorio.dto';
import { EscritorioService } from './escritorio.service';
import { JwtAuthGuard } from 'src/guards/auth-guard';
import { RolesGuard } from 'src/guards/roles-guard';
import { Role } from 'src/decorators/role.decorator';

@Controller('escritorios')
export class EscritorioController {

  constructor(
    private readonly escritorioService: EscritorioService
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('ADMIN')
  @Post()
  create(@Body() data: CreateEscritorioDto) {
    return this.escritorioService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.escritorioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.escritorioService.findOne(id);
  }
}
