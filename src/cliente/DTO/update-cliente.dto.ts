import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";

import { CreateClienteDto } from "./create-cliente.dto";

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @IsString()
  id: string;
}