import { IsString, IsEmail, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User name', maxLength: 30, example: 'John Doe' })
  @IsString()
  @MaxLength(30)
  name: string;

  @ApiProperty({
    description: 'User email',
    maxLength: 30,
    example: 'john@example.com',
  })
  @IsEmail()
  @MaxLength(30)
  email: string;
}
