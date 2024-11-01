import { IsString, IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsDecimal({ decimal_digits: '0,2' }) // Specify decimal format if needed
  amount: number;

  @IsNotEmpty()
  userId: number; // Ensure userId is provided
}
