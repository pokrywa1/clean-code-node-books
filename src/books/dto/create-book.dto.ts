import { IsString, IsInt, MaxLength, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'Book title',
    maxLength: 255,
    example: 'Clean Code: A Handbook of Agile Software Craftsmanship',
  })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'Book genre',
    maxLength: 100,
    example: 'Programming',
  })
  @IsString()
  @MaxLength(100)
  genre: string;

  @ApiProperty({
    description: 'Author ID (must be an existing user)',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  authorId: number;
}
