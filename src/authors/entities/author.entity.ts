import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../../books/entities/book.entity';

export class Author {
  @ApiProperty({ description: 'Author ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Author name', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'Author email', example: 'john@example.com' })
  email: string;

  @ApiProperty({
    description: 'Books written by the author',
    type: () => [Book],
  })
  books?: Book[];
}
