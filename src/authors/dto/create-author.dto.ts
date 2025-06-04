import { IsString, IsEmail, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({
    description: 'Author name',
    maxLength: 30,
    example: 'John Doe',
  })
  @IsString()
  @MaxLength(30)
  name: string;

  @ApiProperty({
    description: 'Author email',
    maxLength: 30,
    example: 'john@example.com',
  })
  @IsEmail()
  @MaxLength(30)
  email: string;
}
