import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateItineraryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  activities: string[];

  // Optionally, you could add a field for destinationId
}
