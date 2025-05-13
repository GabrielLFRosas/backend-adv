import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

import { CreateProcessoDto } from './create-processo.dto';

export class UpdateProcessoDto extends PartialType(CreateProcessoDto){
  @IsString()
  id: string;
}