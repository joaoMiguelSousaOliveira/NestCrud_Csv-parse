import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsDateString()
  @IsOptional()
  completed_at?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
