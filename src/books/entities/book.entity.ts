import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export class Book {
  @ApiProperty({ description: 'Book ID', example: 1 })
  id: number;

  @ApiProperty({ description: 'Book title', example: 'Clean Code' })
  title: string;

  @ApiProperty({ description: 'Book genre', example: 'Programming' })
  genre: string;

  @ApiProperty({ description: 'Author ID', example: 1 })
  authorId: number;

  @ApiProperty({ description: 'Book author', type: () => User })
  author?: User;
}
