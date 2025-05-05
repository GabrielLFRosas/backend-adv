import { IsEnum, IsNumber, IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

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
  percentualParticipacao: string;

  @IsEnum(['EM_ANDAMENTO', 'ENCERRADO'])
  status: 'EM_ANDAMENTO' | 'ENCERRADO';

  @IsString()
  dataInicio: string;

  @IsOptional()
  @IsString()
  dataEncerramento?: string;

}
