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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new author' })
  @ApiResponse({
    status: 201,
    description: 'Author created successfully',
    type: Author,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, description: 'List of authors', type: [Author] })
  findAll(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get author by ID' })
  @ApiParam({ name: 'id', description: 'Author ID', type: 'integer' })
  @ApiResponse({ status: 200, description: 'Author found', type: Author })
  @ApiResponse({ status: 404, description: 'Author not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update author by ID' })
  @ApiParam({ name: 'id', description: 'Author ID', type: 'integer' })
  @ApiResponse({
    status: 200,
    description: 'Author updated successfully',
    type: Author,
  })
  @ApiResponse({ status: 404, description: 'Author not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete author by ID' })
  @ApiParam({ name: 'id', description: 'Author ID', type: 'integer' })
  @ApiResponse({ status: 204, description: 'Author deleted successfully' })
  @ApiResponse({ status: 404, description: 'Author not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Author> {
    return this.authorsService.remove(id);
  }
}
