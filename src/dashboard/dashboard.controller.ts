import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/auth-guard';

import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {

  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get('financeiro')
  async getFinancialSummary(
    @Query('month') month: string,
    @Query('year') year: string,
    @User('id') userId: string
  ) {
    const monthNum = parseInt(month) || new Date().getMonth() + 1;
    const yearNum = parseInt(year) || new Date().getFullYear();
    return this.dashboardService.getFinancialSummary(monthNum, yearNum, userId);
  }
}
