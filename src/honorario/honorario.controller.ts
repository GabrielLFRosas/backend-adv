import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { HonorarioService } from './honorario.service';
import { JwtAuthGuard } from 'src/guards/auth-guard';

@Controller('honorario')
export class HonorarioController {

  constructor(private readonly honorarioService: HonorarioService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: any) {
    return await this.honorarioService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.honorarioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.honorarioService.findOne(id);
  }
  
}
