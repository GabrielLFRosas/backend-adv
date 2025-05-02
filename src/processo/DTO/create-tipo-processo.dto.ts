import { IsString } from "class-validator";

export class CreateTipoProcessoDto {
  @IsString()
  nome: string;

  
}