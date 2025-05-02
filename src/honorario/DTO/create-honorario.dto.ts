import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateHonorarioDTO {

  @IsUUID()
  processoId: string;

  @IsString()
  descricao: string;

  @IsNumber()
  valor: number;

  @IsString()
  dataPrevistaRecebimento: string;

  @IsOptional()
  @IsString() 
  dataRecebido?: string;

  @IsBoolean()
  recebido: boolean;

  @IsOptional()
  @IsNumber()
  nrParcelas?: number;

}