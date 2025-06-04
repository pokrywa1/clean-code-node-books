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

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

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

  async findAll(): Promise<Book[]> {
    return await this.prisma.book.findMany({
      include: {
        author: true,
      },
    });
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

  async findByAuthor(authorId: number): Promise<Book[]> {
    // First check if author exists
    const author = await this.prisma.author.findUnique({
      where: { id: authorId },
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    return await this.prisma.book.findMany({
      where: { authorId },
      include: {
        author: true,
      },
    });
  }

  async findByGenre(genre: string): Promise<Book[]> {
    return await this.prisma.book.findMany({
      where: {
        genre: {
          contains: genre,
          mode: 'insensitive',
        },
      },
      include: {
        author: true,
      },
    });
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
