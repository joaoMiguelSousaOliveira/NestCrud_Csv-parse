import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateImportDto {
  @IsBoolean()
  completed!: boolean;

  @IsDateString()
  completed_at?: string;

  @IsString()
  description!: string;

  @IsString()
  title!: string;
}
