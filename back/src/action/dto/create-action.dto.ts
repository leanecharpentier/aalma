import {
  IsArray,
  IsInt,
  IsString,
  IsUUID,
  Min,
  MaxLength,
} from "class-validator";

export class CreateActionDto {
  @IsUUID()
  category_id: string;

  @IsUUID()
  format_id: string;

  @IsUUID()
  company_id: string;

  @IsUUID()
  speaker_id: string;

  @IsInt()
  @Min(1)
  duration: number;

  @IsInt()
  @Min(1)
  nb_attendees: number;

  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(50)
  price: string;

  @IsString()
  description: string;

  @IsString()
  planification: string;

  @IsArray()
  @IsString({ each: true })
  keywords: string[];
}