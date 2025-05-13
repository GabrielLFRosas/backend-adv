import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {

  constructor(private readonly prismaService: PrismaService) {}

  async getFinancialSummary(month: number, year: number, userId: string) {
    // Define o período do filtro
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    // Busca honorários do período para o usuário
    const honorarios = await this.prismaService.honorario.findMany({
      where: {
        dataPrevistaRecebimento: {
          gte: startDate,
          lte: endDate,
        },
        processo: {
          advogados: {
            some: {
              advogadoId: userId,
            },
          },
        },
      },
      include: {
        processo: {
          select: {
            numero: true,
          },
        },
        parcelas: true,
      },
    });

    // Calcula totais
    const totalHonorariosPrevistos = honorarios.reduce(
      (sum, h) => sum + h.valor,
      0,
    );
    const totalHonorariosRecebidos = honorarios
      .filter((h) => h.recebido)
      .reduce((sum, h) => sum + h.valor, 0);

    // Monta lista de parcelas pendentes
    const parcelasPendentes = honorarios
      .flatMap((honorario) =>
        honorario.parcelas
          .filter((parcela) => !parcela.pago)
          .map((parcela) => ({
            processoNumero: honorario.processo.numero,
            descricao: honorario.descricao,
            valor: parcela.valor,
            dataPrevistaRecebimento: parcela.vencimento.toISOString().split('T')[0],
          })),
      );

    return {
      totalHonorariosPrevistos,
      totalHonorariosRecebidos,
      parcelasPendentes,
    };
  }
}
