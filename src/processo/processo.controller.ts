import { Controller, Post, Body, Get, Param, UseGuards, Query } from '@nestjs/common';
import { ProcessoService } from './processo.service';
import { CreateTipoProcessoDto } from './DTO/create-tipo-processo.dto';
import { CreateProcessoDto } from './DTO/create-processo.dto';
import { JwtAuthGuard } from 'src/guards/auth-guard';

@Controller('processo')
export class ProcessoController {
  constructor(private readonly processoService: ProcessoService){}

  @UseGuards(JwtAuthGuard)
  @Post('/tipo')
  async createType(@Body() data: CreateTipoProcessoDto) {
    return await this.processoService.createTipo(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/tipo')
  async findAllTipo() {
    return await this.processoService.findAllTipo();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/tipo/:id')
  async findOneTipo(@Param('id') id: string) {
    return await this.processoService.findOneTipo(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateProcessoDto) {
    return await this.processoService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    return this.processoService.findAll(pageNum, limitNum);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.processoService.findOne(id);
  }
}
