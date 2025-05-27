import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {

  constructor(private readonly prismaService: PrismaService) {}

  async getFinancialSummary(
    month: number,
    year: number,
    userId: string,
    page: number = 1,
    limit: number = 10
  ) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);
  
    // Busca todos os escritórios relacionados ao usuário
    const escritoriosUsuario = await this.prismaService.usuarioEscritorio.findMany({
      where: { userId },
      select: { escritorioId: true },
    });
  
    const escritorioIds = escritoriosUsuario.map((e) => e.escritorioId);
  
    // Busca as parcelas com paginação
    const parcelas = await this.prismaService.parcelas.findMany({
      where: {
        vencimento: {
          gte: startDate,
          lte: endDate,
        },
        processo: {
          escritorioId: { in: escritorioIds },
        },
      },
      include: {
        processo: {
          include: {
            cliente: true,
            tipo: true,
          },
        },
      },
      orderBy: {
        vencimento: 'asc',
      },
      skip: (page - 1) * limit, // Pular registros para paginação
      take: limit, // Limitar número de registros
    });
  
    // Calcula os totais
    const valorPrevisto = parcelas
      .filter((parcela) => !parcela.pago)
      .reduce((sum, parcela) => sum + parcela.valor, 0);
  
    const valorRecebido = parcelas
      .filter((parcela) => parcela.pago)
      .reduce((sum, parcela) => sum + parcela.valor, 0);
  
    // Conta o total de parcelas para paginação
    const totalParcelas = await this.prismaService.parcelas.count({
      where: {
        vencimento: {
          gte: startDate,
          lte: endDate,
        },
        processo: {
          escritorioId: { in: escritorioIds },
        },
      },
    });
  
    // Formata as parcelas para o formato esperado pelo frontend
    const proximosRecebimentos = parcelas.map((parcela) => ({
      processoNumero: parcela.processo.numero,
      descricao: parcela.processo.descricao,
      valor: parcela.valor,
      dataPrevistaRecebimento: parcela.vencimento.toISOString(),
      pago: parcela.pago,
    }));
  
    return {
      valorPrevisto,
      valorRecebido,
      proximosRecebimentos,
      pagination: {
        total: totalParcelas,
        page,
        limit,
        totalPages: Math.ceil(totalParcelas / limit),
      },
    };
  }

  async registrarPagamento(parcelaId: string) {
    const parcela = await this.prismaService.parcelas.findUnique({
      where: { id: parcelaId },
    });
  
    if (!parcela) {
      throw new NotFoundException('Parcela não encontrada.');
    }
  
    if (parcela.pago) {
      throw new BadRequestException('Parcela já foi paga.');
    }
  
    return this.prismaService.parcelas.update({
      where: { id: parcelaId },
      data: {
        pago: true,
        dataPagamento: new Date(),
      },
    });
  }
  
  
  
}
