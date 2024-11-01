// src/dto/create-booking.dto.ts
import { IsString, IsNotEmpty, IsJSON } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  provider: string;

  @IsString()
  status: string;

  @IsJSON()
  details: Record<string, any>;
}
