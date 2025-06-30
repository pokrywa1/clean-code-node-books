import { PaginationDto } from '../dto/pagination.dto';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';
import { PrismaService } from '../../prisma/prisma.service';

export abstract class PaginatedService<T> {
  protected constructor(protected readonly prisma: PrismaService) {}

  protected async paginate(
    paginationDto: PaginationDto | undefined,
    findManyFn: (skip: number, take: number) => Promise<T[]>,
    countFn: () => Promise<number>,
  ): Promise<PaginatedResponseDto<T>> {
    const { page = 1, limit = 10 } = paginationDto || {};

    const [items, totalItems] = await Promise.all([
      findManyFn((page - 1) * limit, limit),
      countFn(),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        totalItems,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }
}
