import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../../books/entities/book.entity';

export class User {
  @ApiProperty({ description: 'User ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'User name', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'User email', example: 'john@example.com' })
  email: string;

  @ApiProperty({
    description: 'Books authored by the user',
    type: () => [Book],
  })
  books?: Book[];
}
