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
  
    // Buscar parcelas cujo processo tenha advogadoId igual ao userId
    const whereFilter = {
      vencimento: {
        gte: startDate,
        lte: endDate,
      },
      processo: {
        advogados: {
          some: {
            advogadoId: userId,  // Aqui o filtro correto na relação N:N
          },
        },
      },
    };
  
    // Busca as parcelas com paginação
    const parcelas = await this.prismaService.parcelas.findMany({
      where: whereFilter,
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
      skip: (page - 1) * limit,
      take: limit,
    });
  
    // Calcula os totais
    const valorPrevisto = parcelas
      .filter((parcela) => !parcela.pago)
      .reduce((sum, parcela) => sum + parcela.valor, 0);
  
    const valorRecebido = parcelas
      .filter((parcela) => parcela.pago)
      .reduce((sum, parcela) => sum + parcela.valor, 0);
  
    // Conta o total de parcelas para paginação com o mesmo filtro
    const totalParcelas = await this.prismaService.parcelas.count({
      where: whereFilter,
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
