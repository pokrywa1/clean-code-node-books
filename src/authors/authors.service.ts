import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Author } from './entities/author.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    try {
      return await this.prisma.author.create({
        data: createAuthorDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          `Email ${createAuthorDto.email} is already taken`,
        );
      }
      throw error;
    }
  }

  async findAll(): Promise<Author[]> {
    return await this.prisma.author.findMany({
      include: {
        books: true,
      },
    });
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.prisma.author.findUnique({
      where: { id },
      include: {
        books: true,
      },
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    try {
      return await this.prisma.author.update({
        where: { id },
        data: updateAuthorDto,
        include: {
          books: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Author with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number): Promise<Author> {
    try {
      return await this.prisma.author.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Author with ID ${id} not found`);
      }
      throw error;
    }
  }
}
