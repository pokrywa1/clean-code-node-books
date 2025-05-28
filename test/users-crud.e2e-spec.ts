// Test script to verify Users CRUD operations
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/users.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { CreateUserDto } from '../src/users/dto/create-user.dto';
import { UpdateUserDto } from '../src/users/dto/update-user.dto';

describe('UsersService CRUD Operations', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
    };

    const user = await service.create(createUserDto);
    expect(user.name).toBe(createUserDto.name);
    expect(user.email).toBe(createUserDto.email);
    expect(user.id).toBeDefined();
  });

  it('should find all users', async () => {
    const users = await service.findAll();
    expect(Array.isArray(users)).toBe(true);
  });

  it('should find a user by id', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Find User',
      email: 'find@example.com',
    };

    const createdUser = await service.create(createUserDto);
    const foundUser = await service.findOne(createdUser.id);

    expect(foundUser.id).toBe(createdUser.id);
    expect(foundUser.name).toBe(createUserDto.name);
  });

  it('should update a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Update User',
      email: 'update@example.com',
    };

    const createdUser = await service.create(createUserDto);

    const updateUserDto: UpdateUserDto = {
      name: 'Updated User',
    };

    const updatedUser = await service.update(createdUser.id, updateUserDto);
    expect(updatedUser.name).toBe(updateUserDto.name);
    expect(updatedUser.email).toBe(createUserDto.email);
  });

  it('should delete a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Delete User',
      email: 'delete@example.com',
    };

    const createdUser = await service.create(createUserDto);
    const deletedUser = await service.remove(createdUser.id);

    expect(deletedUser.id).toBe(createdUser.id);

    // Verify user is deleted
    await expect(service.findOne(createdUser.id)).rejects.toThrow();
  });
});
