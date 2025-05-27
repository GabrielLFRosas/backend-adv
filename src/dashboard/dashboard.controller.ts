import { BadRequestException, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Put, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/auth-guard';

import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get('financeiro')
  async getFinancialSummary(
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @User('id') userId: string,
  ) {
    return this.dashboardService.getFinancialSummary(
      month,
      year,
      userId,
      page,
      limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('parcela/:id')
  async payInstallment(@Param('id') id: string) {
    return this.dashboardService.registrarPagamento(id);
  }
}
