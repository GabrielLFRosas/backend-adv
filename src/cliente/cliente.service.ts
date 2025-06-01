import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateClienteDto } from './DTO/create-cliente.dto';
import { UpdateClienteDto } from './DTO/update-cliente.dto';

@Injectable()
export class ClienteService {

  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateClienteDto){
    return this.prismaService.cliente.create({
      data,
      select: {
        id: true,
      }
    });
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const take = limit;

    const [customers, total] = await Promise.all([
      this.prismaService.cliente.findMany({
        skip,
        take,
        select: {
          id: true,
          nome: true,
          email: true,
          telefone: true,
          escritorio: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      }),
      this.prismaService.cliente.count(),
    ]);

    return {
      customers,
      page,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
  

  findOne(id: string){  
    return this.prismaService.cliente.findUnique({
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        escritorio: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
      where: {
        id
      }
    });
  }

  update(id: string, data: UpdateClienteDto) {
    return this.prismaService.cliente.update({
      where: {
        id
      },
      data,
    });
  }

  remove(id: string) {
    return this.prismaService.cliente.delete({
      where: {
        id
      },
    });
  }
}
