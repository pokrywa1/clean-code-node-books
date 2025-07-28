import { Prisma } from '@prisma/client';

export const IsPrismaError = (
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError => {
  return error instanceof Prisma.PrismaClientKnownRequestError;
};
