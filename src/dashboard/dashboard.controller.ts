import { BadRequestException, Controller, Get, Query, UseGuards } from '@nestjs/common';
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
    @User('id') userId: string,
  ) {
    const monthNum = parseInt(month) || new Date().getMonth() + 1;
    const yearNum = parseInt(year) || new Date().getFullYear();
    
    if (monthNum < 1 || monthNum > 12) {
      throw new BadRequestException('Month must be between 1 and 12');
    }
    if (yearNum < 2000 || yearNum > 2100) {
      throw new BadRequestException('Year must be between 2000 and 2100');
    }

    return this.dashboardService.getFinancialSummary(monthNum, yearNum, userId);
  }
}
