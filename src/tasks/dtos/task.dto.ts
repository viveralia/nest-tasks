import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(500)
  readonly title: string;

  @IsBoolean()
  @IsOptional()
  readonly completed: boolean;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class FilteredTasksDto {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  offset: number;
}
