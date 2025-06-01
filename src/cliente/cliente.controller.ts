import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth-guard';

import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './DTO/create-cliente.dto';
import { UpdateClienteDto } from './DTO/update-cliente.dto';

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
  ){}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateClienteDto) {
    return this.clienteService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.clienteService.findAll(
      parseInt(page, 10),
      parseInt(limit, 10),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateClienteDto) {
    return this.clienteService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clienteService.remove(id);
  }
}
