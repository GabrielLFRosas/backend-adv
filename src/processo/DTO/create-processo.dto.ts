import { IsEnum, IsInt, IsNumber, IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProcessoDto {
  @IsString()
  numero: string;

  @IsUUID()
  tipoId: string;

  @IsUUID()
  advogadoId: string;

  @IsUUID()
  escritorioId: string;

  @IsUUID()
  clienteId: string;

  @IsString()
  descricao: string;

  @IsNumberString()
  valorCausa: string;

  @IsNumber()
  percentualParticipacao: number;

  @IsEnum(['EM_ANDAMENTO', 'ENCERRADO'])
  status: 'EM_ANDAMENTO' | 'ENCERRADO';

  @IsOptional()
  @IsString()
  dataVencimento: string;

  @IsOptional()
  @IsInt()
  nrParcelas: number;


}
