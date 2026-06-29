import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateImportDto {
  @IsNumber()
  id!: number;

  @IsBoolean()
  completed!: boolean;

  @IsDateString()
  completed_at!: string;

  @IsDateString()
  created_at!: string;

  @IsString()
  description!: string;

  @IsString()
  title!: string;

  @IsDateString()
  updated_at!: string;
}
