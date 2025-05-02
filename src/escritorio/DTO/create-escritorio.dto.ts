import { IsEmail, IsString } from 'class-validator';

export class CreateEscritorioDto {
  @IsString()
  nome: string;

  @IsString()
  cnpj: string;
}