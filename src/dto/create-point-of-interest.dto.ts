// src/dto/create-poi.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePOIDTO {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  location: string;
}
