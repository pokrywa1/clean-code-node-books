import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Book } from './entities/book.entity';
import { Prisma } from '@prisma/client';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
import { PaginatedService } from '../common/services/paginated.service';

@Injectable()
export class BooksService extends PaginatedService<Book> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      return await this.prisma.book.create({
        data: createBookDto,
        include: {
          author: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException(
          `Author with ID ${createBookDto.authorId} does not exist`,
        );
      }
      throw error;
    }
  }

  async findAll(
    paginationDto?: PaginationDto,
  ): Promise<PaginatedResponseDto<Book>> {
    return this.paginate(
      paginationDto,
      (skip, take) =>
        this.prisma.book.findMany({
          include: { author: true },
          skip,
          take,
        }),
      () => this.prisma.book.count(),
    );
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async findByAuthor(
    authorId: number,
    paginationDto?: PaginationDto,
  ): Promise<PaginatedResponseDto<Book>> {
    return this.paginate(
      paginationDto,
      (skip, take) =>
        this.prisma.book.findMany({
          where: { authorId },
          include: { author: true },
          skip,
          take,
        }),
      () => this.prisma.book.count({ where: { authorId } }),
    );
  }

  async findByGenre(
    genre: string,
    paginationDto?: PaginationDto,
  ): Promise<PaginatedResponseDto<Book>> {
    const whereCondition = {
      genre: {
        contains: genre,
        mode: 'insensitive' as Prisma.QueryMode,
      },
    };

    return this.paginate(
      paginationDto,
      (skip, take) =>
        this.prisma.book.findMany({
          where: whereCondition,
          include: { author: true },
          skip,
          take,
        }),
      () => this.prisma.book.count({ where: whereCondition }),
    );
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    try {
      return await this.prisma.book.update({
        where: { id },
        data: updateBookDto,
        include: {
          author: true,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Book with ID ${id} not found`);
        }
        if (error.code === 'P2003') {
          throw new BadRequestException(
            `Author with ID ${updateBookDto.authorId} does not exist`,
          );
        }
      }

      throw error;
    }
  }

  async remove(id: number): Promise<Book> {
    try {
      return await this.prisma.book.delete({
        where: { id },
        include: {
          author: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }
      throw error;
    }
  }
}
