import {
  IsString,
  IsArray,
  IsNotEmpty,
  ValidateNested,
  IsUUID,
  IsBoolean,
  IsNumber
} from 'class-validator';
import { Type } from 'class-transformer';

class OptionDTO {
  @IsNumber()
  id!: number;

  @IsString()
  text!: string;

  @IsBoolean()
  isCorrect!: boolean;
}

export class CreateQuestionDTO {
  @IsString()
  @IsNotEmpty()
  type!: string;

  @IsString()
  @IsNotEmpty()
  question!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OptionDTO)
  options!: OptionDTO[];

  @IsUUID()
  test_id!: string;
}
