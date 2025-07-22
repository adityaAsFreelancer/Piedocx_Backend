import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTestDTO {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsNumber()
  questions!: number;

  @IsNotEmpty()
  @IsNumber()
  marks!: number;

  @IsNotEmpty()
  @IsNumber()
  time!: number;
}
