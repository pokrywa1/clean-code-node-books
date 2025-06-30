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
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
import { PaginatedService } from '../common/services/paginated.service';

@Injectable()
export class AuthorsService extends PaginatedService<Author> {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

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

  async findAll(
    paginationDto?: PaginationDto,
  ): Promise<PaginatedResponseDto<Author>> {
    return this.paginate(
      paginationDto,
      (skip, take) =>
        this.prisma.author.findMany({
          include: { books: true },
          skip,
          take,
        }),
      () => this.prisma.author.count(),
    );
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
