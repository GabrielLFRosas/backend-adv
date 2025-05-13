import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";

import { CreateHonorarioDTO } from "./create-honorario.dto";

export class UpdateHonorarioDTO extends PartialType(CreateHonorarioDTO) {
  @IsString()
  id: string;
}