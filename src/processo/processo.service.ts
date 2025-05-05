import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateProcessoDto } from './DTO/create-processo.dto';
import { CreateTipoProcessoDto } from './DTO/create-tipo-processo.dto';

@Injectable()
export class ProcessoService {
  constructor(private readonly prismaService: PrismaService) {}

  createTipo(data: CreateTipoProcessoDto) {
    return this.prismaService.tipoProcesso.create({
      data: {
        nome: data.nome,
      },
    });
  }

  findAllTipo() {
    return this.prismaService.tipoProcesso.findMany({});
  }

  findOneTipo(id: string) {
    return this.prismaService.tipoProcesso.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateProcessoDto) {
    const createProcess = await this.prismaService.processo.create({
      data: {
        numero: data.numero,
        tipoId: data.tipoId,
        escritorioId: data.escritorioId,
        clienteId: data.clienteId,
        descricao: data.descricao,
        valorCausa: parseFloat(data.valorCausa),
        status: data.status,
        dataInicio: new Date(data.dataInicio),
        dataEncerramento: data.dataEncerramento
          ? new Date(data.dataEncerramento)
          : null,
      },
      select: {
        id: true,
      },
    });
    if (!createProcess) {
      throw new Error('Error creating process');
    }

    const bindUserProcesso = await this.prismaService.advogadoProcesso.create({
      data: {
        advogadoId: data.advogadoId,
        processoId: createProcess.id,
        percentualParticipacao: parseInt(data.percentualParticipacao),
      },
    });
    if (!bindUserProcesso) {
      throw new Error('Error binding process to user');
    }
    return createProcess;
  }

  async findAll() {
    const processos = await this.prismaService.processo.findMany({
      select: {
        id: true,
        numero: true,
        tipo: { select: { id: true, nome: true } },
        escritorio: { select: { id: true, nome: true } },
        cliente: { select: { id: true, nome: true } },
        descricao: true,
        valorCausa: true,
        status: true,
        dataInicio: true,
        dataEncerramento: true,
        advogados: {
          select: {
            percentualParticipacao: true,
            advogado: { select: { id: true, nome: true } },
          },
        },
      },
    });

    return processos.map((processo) => ({
      ...processo,
      advogados: processo.advogados.map((a) => ({
        nome: a.advogado.nome,
        percentualParticipacao: a.percentualParticipacao,
      })),
    }));
  }

  async findOne(id: string) {
    const processo = await this.prismaService.processo.findUnique({
      where: { id },
      select: {
        id: true,
        numero: true,
        tipo: { select: { nome: true } },
        escritorio: { select: { nome: true } },
        cliente: { select: { nome: true } },
        descricao: true,
        valorCausa: true,
        status: true,
        dataInicio: true,
        dataEncerramento: true,
        advogados: {
          select: {
            percentualParticipacao: true,
            advogado: { select: { nome: true } },
          },
        },
      },
    });

    if (!processo) return null;

    return {
      ...processo,
      advogados: processo.advogados.map((a) => ({
        nome: a.advogado.nome,
        percentualParticipacao: a.percentualParticipacao,
      })),
    };
  }
}
