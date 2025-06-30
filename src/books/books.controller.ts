import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({
    status: 201,
    description: 'Book created successfully',
    type: Book,
  })
  @ApiResponse({ status: 400, description: 'Bad request or author not found' })
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({
    status: 200,
    description: 'List of books with pagination metadata',
    type: PaginatedResponseDto<Book>,
  })
  @ApiQuery({
    name: 'author',
    required: false,
    description: 'Filter by author ID',
    type: 'integer',
  })
  @ApiQuery({
    name: 'genre',
    required: false,
    description: 'Filter by genre (case-insensitive partial match)',
    type: 'string',
  })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('author', new ParseIntPipe({ optional: true })) authorId?: number,
    @Query('genre') genre?: string,
  ): Promise<PaginatedResponseDto<Book>> {
    if (authorId) {
      return this.booksService.findByAuthor(authorId, paginationDto);
    }
    if (genre) {
      return this.booksService.findByGenre(genre, paginationDto);
    }
    return this.booksService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book by ID' })
  @ApiParam({ name: 'id', description: 'Book ID', type: 'integer' })
  @ApiResponse({
    status: 200,
    description: 'Book found',
    type: Book,
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update book by ID' })
  @ApiParam({ name: 'id', description: 'Book ID', type: 'integer' })
  @ApiResponse({
    status: 200,
    description: 'Book updated successfully',
    type: Book,
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @ApiResponse({ status: 400, description: 'Bad request or author not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete book by ID' })
  @ApiParam({ name: 'id', description: 'Book ID', type: 'integer' })
  @ApiResponse({
    status: 200,
    description: 'Book deleted successfully',
    type: Book,
  })
  @ApiResponse({ status: 404, description: 'Book not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.booksService.remove(id);
  }
}
