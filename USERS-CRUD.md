# Users CRUD Operations

This document describes the CRUD (Create, Read, Update, Delete) operations implemented for the Users module.

## Overview

The Users module provides complete CRUD operations for managing users in the system. Each user has the following properties:

- `id`: Unique identifier (auto-generated)
- `name`: User's name (max 30 characters)
- `email`: User's email (max 30 characters, unique)
- `books`: Related books authored by the user

## API Endpoints

### 1. Create User

**POST** `/users`

Creates a new user in the system.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

### 2. Get All Users

**GET** `/users`

Retrieves all users with their associated books.

**Response:**

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "books": [
      {
        "id": 1,
        "title": "Clean Code",
        "genre": "Programming",
        "authorId": 1
      }
    ]
  }
]
```

### 3. Get User by ID

**GET** `/users/:id`

Retrieves a specific user by their ID, including their books.

**Response:**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "books": [
    {
      "id": 1,
      "title": "Clean Code",
      "genre": "Programming",
      "authorId": 1
    }
  ]
}
```

### 4. Update User

**PATCH** `/users/:id`

Updates an existing user's information.

**Request Body:**

```json
{
  "name": "Jane Doe"
}
```

**Response:**

```json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "john@example.com",
  "books": []
}
```

### 5. Delete User

**DELETE** `/users/:id`

Deletes a user from the system.

**Response:** HTTP 204 No Content

## Validation

The following validation rules are applied:

- **name**: Required, string, maximum 30 characters
- **email**: Required, valid email format, maximum 30 characters, must be unique

## Error Handling

The API handles the following error scenarios:

- **400 Bad Request**: Invalid request data or validation errors
- **404 Not Found**: User with specified ID not found
- **409 Conflict**: Email already exists (for create/update operations)

## Database Schema

The User model in Prisma schema:

```prisma
model User {
  id     Int     @id @default(autoincrement())
  name   String  @db.VarChar(30)
  email  String  @unique @db.VarChar(30)
  books  Book[]
}
```

## Testing the API

You can test the API using:

1. **Swagger UI**: Visit `http://localhost:8080/api` when the application is running
2. **curl commands**:

```bash
# Create a user
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'

# Get all users
curl http://localhost:8080/users

# Get user by ID
curl http://localhost:8080/users/1

# Update user
curl -X PATCH http://localhost:8080/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe"}'

# Delete user
curl -X DELETE http://localhost:8080/users/1
```

## Implementation Details

- **Service Layer**: `UsersService` handles all business logic and database operations
- **Controller Layer**: `UsersController` handles HTTP requests and responses
- **DTOs**: `CreateUserDto` and `UpdateUserDto` provide type safety and validation
- **Database**: Uses Prisma ORM with PostgreSQL
- **Validation**: Uses class-validator decorators for input validation
- **Documentation**: Swagger/OpenAPI decorators for automatic API documentation
