import { IsEmail, IsString, IsUUID } from "class-validator";

export class CreateClienteDto {
  
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  telefone: string;

  @IsUUID()
  escritorioId: string;
}