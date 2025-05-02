import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateEscritorioDto } from './DTO/create-escritorio.dto';

@Injectable()
export class EscritorioService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  create(data: CreateEscritorioDto) {
    return this.prismaService.escritorio.create({
      data: data,
    });
  }

  findAll() {
    return this.prismaService.escritorio.findMany();
  }

  findOne(id: string) {
    return this.prismaService.escritorio.findUnique({
      where: {
        id
      }
    });
  }

  findUsersByEscritorio(escritorioId: string) {
    return this.prismaService.usuarioEscritorio.findMany({
      where: {
        escritorioId
      },
      select: {
        user: {
          select: {
            id: true,
            nome: true,
            email: true,
            senhaHash: false,
            role: true
          }
        }
      }
    });
  }
}
