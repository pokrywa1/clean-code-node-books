# Books CRUD Operations

This document describes the CRUD (Create, Read, Update, Delete) operations implemented for the Books module.

## Overview

The Books module provides complete CRUD operations for managing books in the system. Each book has the following properties:

- `id`: Unique identifier (auto-generated)
- `title`: Book title (max 255 characters)
- `genre`: Book genre (max 100 characters)
- `authorId`: Reference to the user who authored the book
- `author`: Related user object (populated in responses)

## API Endpoints

### 1. Create Book

**POST** `/books`

Creates a new book in the system.

**Request Body:**

```json
{
  "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
  "genre": "Programming",
  "authorId": 1
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
  "genre": "Programming",
  "authorId": 1,
  "author": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 2. Get All Books

**GET** `/books`

Retrieves all books with their associated authors.

**Query Parameters:**

- `author` (optional): Filter by author ID
- `genre` (optional): Filter by genre (case-insensitive partial match)

**Examples:**

- `GET /books` - Get all books
- `GET /books?author=1` - Get books by author ID 1
- `GET /books?genre=programming` - Get books with genre containing "programming"

**Response:**

```json
[
  {
    "id": 1,
    "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
    "genre": "Programming",
    "authorId": 1,
    "author": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  },
  {
    "id": 2,
    "title": "The Pragmatic Programmer",
    "genre": "Programming",
    "authorId": 2,
    "author": {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  }
]
```

### 3. Get Book by ID

**GET** `/books/:id`

Retrieves a specific book by its ID, including the author information.

**Response:**

```json
{
  "id": 1,
  "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
  "genre": "Programming",
  "authorId": 1,
  "author": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 4. Update Book

**PATCH** `/books/:id`

Updates an existing book's information.

**Request Body:**

```json
{
  "title": "Clean Code: Updated Edition",
  "genre": "Software Engineering"
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Clean Code: Updated Edition",
  "genre": "Software Engineering",
  "authorId": 1,
  "author": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 5. Delete Book

**DELETE** `/books/:id`

Deletes a book from the system.

**Response:**

```json
{
  "id": 1,
  "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
  "genre": "Programming",
  "authorId": 1,
  "author": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Validation

The following validation rules are applied:

- **title**: Required, string, maximum 255 characters
- **genre**: Required, string, maximum 100 characters
- **authorId**: Required, positive integer, must reference an existing user

## Error Handling

The API handles the following error scenarios:

- **400 Bad Request**:
  - Invalid request data or validation errors
  - Author with specified ID does not exist
- **404 Not Found**:
  - Book with specified ID not found
  - Author with specified ID not found (for filtering)

## Advanced Features

### Filtering by Author

```bash
GET /books?author=1
```

Returns all books authored by the user with ID 1. If the author doesn't exist, returns a 404 error.

### Filtering by Genre

```bash
GET /books?genre=javascript
```

Returns all books where the genre contains "javascript" (case-insensitive). This allows for flexible searching across different genre variations.

## Database Schema

The Book model in Prisma schema:

```prisma
model Book {
  id       Int    @id @default(autoincrement())
  title    String @db.VarChar(255)
  genre    String @db.VarChar(100)
  authorId Int
  author   User   @relation(fields: [authorId], references: [id])
}
```

## Testing the API

You can test the API using:

1. **Swagger UI**: Visit `http://localhost:8080/api` when the application is running
2. **curl commands**:

```bash
# Create a book
curl -X POST http://localhost:8080/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "TypeScript Handbook",
    "genre": "Programming",
    "authorId": 1
  }'

# Get all books
curl http://localhost:8080/books

# Get books by author
curl "http://localhost:8080/books?author=1"

# Get books by genre
curl "http://localhost:8080/books?genre=programming"

# Get book by ID
curl http://localhost:8080/books/1

# Update book
curl -X PATCH http://localhost:8080/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "TypeScript Handbook: Updated Edition",
    "genre": "Web Development"
  }'

# Delete book
curl -X DELETE http://localhost:8080/books/1
```

## Sample Data

The seed script creates the following sample books:

1. **Clean Code: A Handbook of Agile Software Craftsmanship** (Programming) - by John Doe
2. **The Pragmatic Programmer: Your Journey to Mastery** (Programming) - by Jane Smith
3. **Design Patterns: Elements of Reusable Object-Oriented Software** (Programming) - by John Doe
4. **You Don't Know JS: Scope & Closures** (JavaScript) - by Bob Wilson
5. **Refactoring: Improving the Design of Existing Code** (Programming) - by Jane Smith
6. **JavaScript: The Good Parts** (JavaScript) - by Bob Wilson

## Implementation Details

- **Service Layer**: `BooksService` handles all business logic and database operations
- **Controller Layer**: `BooksController` handles HTTP requests and responses with advanced filtering
- **DTOs**: `CreateBookDto` and `UpdateBookDto` provide type safety and validation
- **Database**: Uses Prisma ORM with PostgreSQL and foreign key constraints
- **Validation**: Uses class-validator decorators for input validation
- **Documentation**: Complete Swagger/OpenAPI documentation with examples
- **Error Handling**: Comprehensive error handling for database constraints and business logic
- **Relationships**: Proper handling of author-book relationships with data population

## Related Operations

- **Users CRUD**: See `USERS-CRUD.md` for managing book authors
- **Articles CRUD**: Existing article management system

The Books CRUD operations integrate seamlessly with the Users module, ensuring data integrity through foreign key constraints and providing rich relational data in API responses.
