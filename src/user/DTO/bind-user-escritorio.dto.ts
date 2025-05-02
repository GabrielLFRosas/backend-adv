import { IsEnum, IsString } from 'class-validator';

export class BindUserToEscritorioDto {
  @IsString()
  userId: string;

  @IsString()
  escritorioId: string;

  @IsEnum(['ADMIN', 'MEMBRO'])
  permissao: 'ADMIN' | 'MEMBRO';
}