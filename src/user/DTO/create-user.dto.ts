import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senha: string;

  @IsEnum(['ADVOGADO', 'ADMIN'])
  role: UserRole;
}


enum UserRole {
  ADVOGADO = 'ADVOGADO',
  ADMIN = 'ADMIN',
}