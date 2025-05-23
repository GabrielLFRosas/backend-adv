import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateProcessoDto } from './DTO/create-processo.dto';
import { CreateTipoProcessoDto } from './DTO/create-tipo-processo.dto';
import { UpdateProcessoDto } from './DTO/update-processo.dto';

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
        dataVencimento: data.dataVencimento,
        nrParcelas: data.nrParcelas,
        percentualParticipacao: data.percentualParticipacao
      },
      select: {
        id: true,
      },
    });

    if(!data.nrParcelas){
      await this.prismaService.parcelas.create({
        data: {
          processoId: createProcess.id,
          valor: parseFloat(data.valorCausa) * (data.percentualParticipacao / 100) / 1,
          vencimento: data.dataVencimento,
        }
      })
    } else {
      for(var i=1; i <= data.nrParcelas; i++){
        const vencimento = new Date(data.dataVencimento);
        if(i > 1){
          vencimento.setMonth(vencimento.getMonth() + i); 
        }
        await this.prismaService.parcelas.create({
          data: {
            processoId: createProcess.id,
            valor: parseFloat(data.valorCausa) * (data.percentualParticipacao / 100) / data.nrParcelas,
            vencimento: vencimento,
            pago: false
          }
        })
      }
    }


    if (!createProcess) {
      throw new Error('Error creating process');
    }

    const bindUserProcesso = await this.prismaService.advogadoProcesso.create({
      data: {
        advogadoId: data.advogadoId,
        processoId: createProcess.id,
      },
    });
    if (!bindUserProcesso) {
      throw new Error('Error binding process to user');
    }
    return createProcess;
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const take = limit;

    const total = await this.prismaService.processo.count();

    const processos = await this.prismaService.processo.findMany({
      skip,
      take,
      select: {
        id: true,
        numero: true,
        tipo: { select: { id: true, nome: true } },
        escritorio: { select: { id: true, nome: true } },
        cliente: { select: { id: true, nome: true } },
        descricao: true,
        valorCausa: true,
        status: true,
        percentualParticipacao: true,
        dataVencimento: true,
        nrParcelas: true,
        advogados: {
          select: {
            advogado: { select: { id: true, nome: true } },
          },
        },
      },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: processos.map((processo) => ({
        ...processo,
        advogados: processo.advogados.map((a) => ({
          nome: a.advogado.nome,
        })),
      })),
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async listAll() {
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
        dataVencimento: true,
        percentualParticipacao: true,
        nrParcelas: true,
        advogados: {
          select: {
            advogado: { select: { id: true, nome: true } },
          },
        },
      },
    });

    return processos.map((processo) => ({
      ...processo,
      advogados: processo.advogados.map((a) => ({
        nome: a.advogado.nome,
      })),
    }));
  }

  async findOne(id: string) {
    const processo = await this.prismaService.processo.findUnique({
      where: { id },
      select: {
        id: true,
        numero: true,
        tipo: { select: { id: true, nome: true } },
        escritorio: { select: { id: true, nome: true } },
        cliente: { select: { id: true, nome: true } },
        descricao: true,
        valorCausa: true,
        status: true,
        percentualParticipacao: true,
        dataVencimento: true,
        nrParcelas: true,
        advogados: {
          select: {
            advogado: { select: { id: true, nome: true } },
          },
        },
      },
    });

    if (!processo) return null;

    return {
      ...processo,
      advogados: processo.advogados.map((a) => ({
        id: a.advogado.id,
        nome: a.advogado.nome,
      })),
    };
  }

  async update(id: string, data: UpdateProcessoDto) {
    const processo = await this.prismaService.processo.update({
      where: { id },
      data: {
        numero: data?.numero,
        tipoId: data?.tipoId,
        escritorioId: data?.escritorioId,
        clienteId: data?.clienteId,
        descricao: data?.descricao,
        valorCausa: parseFloat(data?.valorCausa),
        status: data?.status,
        dataVencimento: data.dataVencimento,
        nrParcelas: data.nrParcelas,
        percentualParticipacao: data.percentualParticipacao,
      },
    });

    await this.prismaService.parcelas.deleteMany({where: {
       processoId: id
    }});

    if(!data.nrParcelas){
      this.prismaService.parcelas.create({ data: {
        processoId: id,
        valor: parseFloat(data.valorCausa) * (data.percentualParticipacao / 100) / 1,
        vencimento: data.dataVencimento
      }})
    } else {
      for(var i=1; i <= data.nrParcelas; i++){
        const vencimento = new Date(data.dataVencimento);
        if(i > 1){
          vencimento.setMonth(vencimento.getMonth() + i); 
        }
  
        await this.prismaService.parcelas.create({
          data: {
            processoId: id,
            valor: parseFloat(data.valorCausa) * (data.percentualParticipacao / 100) / data.nrParcelas,
            vencimento: vencimento,
            pago: false
          }
        })
      }
    }

    const bindUserProcesso = await this.prismaService.advogadoProcesso.update({
      data: {
        advogadoId: data.advogadoId,
      },
      where: {
        processoId_advogadoId: {
          processoId: id,
          advogadoId: data.advogadoId,
        },
      },
    });
    if (!bindUserProcesso) {
      throw new Error('Error binding process to user');
    }

    return processo;
  }

  async remove(id: string) {

    await this.prismaService.parcelas.deleteMany({
      where: {
        processoId: id
      }
    })

    // Aguarde o deleteMany de advogadoProcesso
    await this.prismaService.advogadoProcesso.deleteMany({
      where: {
        processoId: id,
      },
    });

    // Finalmente delete o processo
    const processo = await this.prismaService.processo.delete({
      where: { id },
    });

    return processo;
  }
}
