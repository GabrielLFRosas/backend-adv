import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth-guard';

import { UpdateHonorarioDTO } from './DTO/update-honorario.dto';
import { HonorarioService } from './honorario.service';

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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateHonorarioDTO) {
    return await this.honorarioService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.honorarioService.remove(id);
  }
  
}
