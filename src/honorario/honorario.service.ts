import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateHonorarioDTO } from './DTO/create-honorario.dto';
import { UpdateHonorarioDTO } from './DTO/update-honorario.dto';

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
      const valor = parseFloat(data.valor);
      const valorParcela = parseFloat((valor / data.nrParcelas).toFixed(2));
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
      where: {
        id,
      },
    });
  }

  async update(id: string, data: UpdateHonorarioDTO) {
    const honorario = await this.prismaService.honorario.update({
      where: { id },
      data: {
        valor: parseFloat(data.valor),
        dataPrevistaRecebimento: new Date(data.dataPrevistaRecebimento),
        dataRecebido: data.dataRecebido ? new Date(data.dataRecebido) : null,
        descricao: data.descricao,
        recebido: data.recebido,
      },
    });

    const parcelas = await this.prismaService.parcelaHonorario.findMany({
      where: {
        honorarioId: id,
      },
    });

    if (parcelas.length > 0) {
      await this.prismaService.parcelaHonorario.deleteMany({
        where: {
          honorarioId: id,
        },
      });

      if (data.nrParcelas && data.nrParcelas > 1) {
        const valor = parseFloat(data.valor);
        const valorParcela = parseFloat((valor / data.nrParcelas).toFixed(2));
        const parcelas = [];
    
        for (let i = 0; i < data.nrParcelas; i++) {
          const vencimento = new Date(data.dataPrevistaRecebimento);
          vencimento.setMonth(vencimento.getMonth() + i); 
    
          parcelas.push({
            honorarioId: id,
            valor: valorParcela,
            vencimento,
          });
        }
    
        await this.prismaService.parcelaHonorario.createMany({
          data: parcelas,
        });
      }

    }
  
    return honorario;
  }

  async remove(id: string) {
    await this.prismaService.parcelaHonorario.findMany({
      where: {
        honorarioId: id,
      },
    });

    const honorario = await this.prismaService.honorario.delete({
      where: { id },
    });

    return honorario;
  }
  
}
