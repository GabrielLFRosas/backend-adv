import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {

  constructor(private readonly prismaService: PrismaService) {}

  async getFinancialSummary(month: number, year: number, userId: string) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const processos = await this.prismaService.processo.findMany({
      where: {
        advogados: {
          some: {
            advogadoId: userId,
          },
        },
        dataInicio: {
          lte: endDate,
        },
        OR: [
          { dataEncerramento: null },
          { dataEncerramento: { gte: startDate } },
        ],
      },
      include: {
        honorarios: {
          include: {
            parcelas: true,
          },
        },
      },
    });

    const totalValorCausa = processos.reduce((sum, p) => sum + (p.valorCausa || 0), 0);
    const totalHonorariosPrevistos = processos.reduce((sum, p) =>
      sum + p.honorarios.reduce((hSum, h) => hSum + (h.valor || 0), 0), 0);
    const totalHonorariosRecebidos = processos.reduce((sum, p) =>
      sum + p.honorarios.reduce((hSum, h) =>
        hSum + h.parcelas.reduce((pSum, p) => pSum + (p.pago ? p.valor : 0), 0), 0), 0);

    const processosDestaque = processos
      .map(p => ({
        numero: p.numero,
        valorCausa: p.valorCausa || 0,
        honorariosPendentes: p.honorarios.reduce((hSum, h) =>
          hSum + h.parcelas.reduce((pSum, p) => pSum + (!p.pago ? p.valor : 0), 0), 0),
      }))
      .sort((a, b) => b.honorariosPendentes - a.honorariosPendentes)
      .slice(0, 5); 

    return {
      totalValorCausa,
      totalHonorariosPrevistos,
      totalHonorariosRecebidos,
      processosDestaque,
    };
  }
}
