import { ApiProperty } from '@nestjs/swagger';
import { Author } from '../../authors/entities/author.entity';

export class Book {
  @ApiProperty({ description: 'Book ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Book title', example: 'Clean Code' })
  title: string;

  @ApiProperty({ description: 'Book genre', example: 'Programming' })
  genre: string;

  @ApiProperty({ description: 'Author ID', example: 1 })
  authorId: number;

  @ApiProperty({ description: 'Book author', type: () => Author })
  author?: Author;
}
