// src/dto/create-review.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDTO {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsNumber()
  destinationId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number; // Assuming you want to link the review to a user
}
