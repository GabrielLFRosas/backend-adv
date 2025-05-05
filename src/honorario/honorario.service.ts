import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateHonorarioDTO } from './DTO/create-honorario.dto';

@Injectable()
export class HonorarioService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateHonorarioDTO) {
    const honorario = await this.prismaService.honorario.create({
      data: {
        processoId: data.processoId,
        valor: parseFloat(data.valor),
        dataPrevistaRecebimento: new Date(data.dataPrevistaRecebimento),
        dataRecebido: data.dataRecebido ? new Date(data.dataRecebido) : null,
        descricao: data.descricao,
        recebido: data.recebido,
      },
      select: {
        id: true,
      },
    });
  
    if (data.nrParcelas && data.nrParcelas > 1) {
      const valorParcela = parseFloat((parseFloat(data.valor) / data.nrParcelas).toFixed(2));
      const parcelas = [];
  
      for (let i = 0; i < data.nrParcelas; i++) {
        const vencimento = new Date(data.dataPrevistaRecebimento);
        vencimento.setMonth(vencimento.getMonth() + i); 
  
        parcelas.push({
          honorarioId: honorario.id,
          valor: valorParcela,
          vencimento,
        });
      }
  
      await this.prismaService.parcelaHonorario.createMany({
        data: parcelas,
      });
    }
  
    return honorario;
  }
  
  async findAll() {
    return this.prismaService.honorario.findMany({
      select: {
        id: true,
        processo: {
          select: {
            id: true,
            numero: true,
          },
        },
        valor: true,
        dataPrevistaRecebimento: true,
        dataRecebido: true,
        descricao: true,
        recebido: true,
        parcelas: {
          orderBy: {
            vencimento: 'asc',
          },
          select: {
            id: true,
            valor: true,
            vencimento: true,
            pago: true,
            dataPagamento: true,
          },
        },
      },
    });
  }
  
  async findOne(id: string) {
    return this.prismaService.honorario.findUnique({
      select: {
        id: true,
        processo: {
          select: {
            numero: true,
          },
        },
        valor: true,
        dataPrevistaRecebimento: true,
        dataRecebido: true,
        descricao: true,
        recebido: true,
        parcelas: {
          orderBy: {
            vencimento: 'asc',
          },
          select: {
            id: true,
            valor: true,
            vencimento: true,
            pago: true,
            dataPagamento: true,
          },
        },
      },
      where: {
        id,
      },
    });
  }
  
}
