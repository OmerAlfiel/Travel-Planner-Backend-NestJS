import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  // You can also add a userId if you want to associate the community with a user.
  // @IsInt()
  // userId: number; // Uncomment if needed
}
