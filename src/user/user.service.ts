import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

import { BindUserToEscritorioDto } from './DTO/bind-user-escritorio.dto';
import { CreateUserDto } from './DTO/create-user.dto';

@Injectable()
export class UserService {

  constructor(
    private readonly prismaService: PrismaService
  ) {}
  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    return this.prismaService.user.create({
      data: {
        nome: data.nome,
        email: data.email,
        senhaHash: hashedPassword,
        role: data.role
      },
      select: {
        id: true,
      }
    });
  }

  findAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        senhaHash: false,
        role: true
      }
    });
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      select:{
        id: true,
        nome: true,
        email: true,
        senhaHash: false,
        role: true
      },
      where: {
        id
      }
    });
  }

  bindUserToEscritorio(data: BindUserToEscritorioDto) {
    return this.prismaService.usuarioEscritorio.create({
      data
    });
  }

  findEscritoriosByUser(userId: string) {
    return this.prismaService.usuarioEscritorio.findMany({
      where: {
        userId
      },
      select: {
        escritorio: {
          select: {
            id: true,
            nome: true,
            cnpj: true,
          }
        }
      }
    });
  }
}
