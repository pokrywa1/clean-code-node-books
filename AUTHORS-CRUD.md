# Authors CRUD Operations

This document describes the CRUD (Create, Read, Update, Delete) operations implemented for the Authors module.

## Overview

The Authors module provides complete CRUD operations for managing authors in the system. Each author has the following properties:

- `id`: Unique identifier (auto-generated)
- `name`: Author's name (max 30 characters)
- `email`: Author's email (max 30 characters, unique)
- `books`: Books written by the author

## API Endpoints

### 1. Create Author

**POST** `/authors`

Creates a new author in the system.

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

### 2. Get All Authors

**GET** `/authors`

Retrieves all authors with their associated books.

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

### 3. Get Author by ID

**GET** `/authors/:id`

Retrieves a specific author by their ID, including their books.

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

### 4. Update Author

**PATCH** `/authors/:id`

Updates an existing author's information.

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

### 5. Delete Author

**DELETE** `/authors/:id`

Deletes an author from the system.

**Response:** HTTP 204 No Content

## Validation

The following validation rules are applied:

- **name**: Required, string, maximum 30 characters
- **email**: Required, valid email format, maximum 30 characters, must be unique

## Error Handling

The API handles the following error scenarios:

- **400 Bad Request**: Invalid request data or validation errors
- **404 Not Found**: Author with specified ID not found
- **409 Conflict**: Email already exists (for create/update operations)

## Database Schema

The Author model in Prisma schema:

```prisma
model Author {
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
# Create an author
curl -X POST http://localhost:8080/authors \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'

# Get all authors
curl http://localhost:8080/authors

# Get author by ID
curl http://localhost:8080/authors/1

# Update author
curl -X PATCH http://localhost:8080/authors/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe"}'

# Delete author
curl -X DELETE http://localhost:8080/authors/1
```

## Implementation Details

- **Service Layer**: `AuthorsService` handles all business logic and database operations
- **Controller Layer**: `AuthorsController` handles HTTP requests and responses
- **DTOs**: `CreateAuthorDto` and `UpdateAuthorDto` provide type safety and validation
- **Database**: Uses Prisma ORM with PostgreSQL
- **Validation**: Uses class-validator decorators for input validation
- **Documentation**: Swagger/OpenAPI decorators for automatic API documentation
