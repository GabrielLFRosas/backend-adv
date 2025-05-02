import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './DTO/create-cliente.dto';
import { JwtAuthGuard } from 'src/guards/auth-guard';

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
  async findAll() {
    return this.clienteService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clienteService.findOne(id);
  }
}
