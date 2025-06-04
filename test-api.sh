#!/bin/bash

# API Testing Script for Clean Code Node Books API
echo "🚀 Testing Clean Code Node Books API"
echo "================================="

BASE_URL="http://localhost:8080"

echo ""
echo "📚 BOOKS CRUD OPERATIONS"
echo "========================"

echo ""
echo "1. GET /books - List all books"
curl -s "$BASE_URL/books" | jq '.[0:2]'

echo ""
echo "2. GET /books?genre=Programming - Filter by genre"
curl -s "$BASE_URL/books?genre=Programming" | jq '. | length'
echo "Found $(curl -s "$BASE_URL/books?genre=Programming" | jq '. | length') Programming books"

echo ""
echo "3. GET /books?author=3 - Filter by author"
curl -s "$BASE_URL/books?author=3" | jq '. | length'
echo "Found $(curl -s "$BASE_URL/books?author=3" | jq '. | length') books by author ID 3"

echo ""
echo "4. GET /books/1 - Get specific book"
curl -s "$BASE_URL/books/1" | jq '.title'

echo ""
echo "5. POST /books - Create new book"
NEW_BOOK=$(curl -s -X POST "$BASE_URL/books" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "You Don'\''t Know JS",
    "genre": "JavaScript",
    "authorId": 2
  }')
echo "Created book: $(echo $NEW_BOOK | jq '.title')"
NEW_BOOK_ID=$(echo $NEW_BOOK | jq '.id')

echo ""
echo "6. PATCH /books/$NEW_BOOK_ID - Update book"
curl -s -X PATCH "$BASE_URL/books/$NEW_BOOK_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "You Don'\''t Know JS: Scope & Closures"
  }' | jq '.title'

echo ""
echo "👥 USERS CRUD OPERATIONS"
echo "========================"

echo ""
echo "1. GET /users - List all users"
curl -s "$BASE_URL/users" | jq '.[0] | {id, name, email, bookCount: (.books | length)}'

echo ""
echo "2. GET /users/2 - Get user with books"
curl -s "$BASE_URL/users/2" | jq '{id, name, email, bookCount: (.books | length)}'

echo ""
echo "3. POST /users - Create new user"
NEW_USER=$(curl -s -X POST "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com"
  }')
echo "Created user: $(echo $NEW_USER | jq '.name')"
NEW_USER_ID=$(echo $NEW_USER | jq '.id')

echo ""
echo "4. PATCH /users/$NEW_USER_ID - Update user"
curl -s -X PATCH "$BASE_URL/users/$NEW_USER_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson-Smith"
  }' | jq '.name'

echo ""
echo "🔍 ERROR HANDLING TESTS"
echo "======================="

echo ""
echo "1. Duplicate email constraint"
curl -s -X POST "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Duplicate",
    "email": "john@example.com"
  }' | jq '.message'

echo ""
echo "2. Invalid book authorId"
curl -s -X POST "$BASE_URL/books" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Non-existent Author",
    "genre": "Fiction",
    "authorId": 999
  }' | jq '.message'

echo ""
echo "3. Non-existent user"
curl -s "$BASE_URL/users/999" | jq '.message'

echo ""
echo "4. Input validation"
curl -s -X POST "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "email": "invalid-email"
  }' | jq '.message'

echo ""
echo "✅ API Testing Complete!"
echo "========================"
echo ""
echo "📊 SUMMARY:"
echo "- Total books: $(curl -s "$BASE_URL/books" | jq '. | length')"
echo "- Total users: $(curl -s "$BASE_URL/users" | jq '. | length')"
echo "- API Documentation: $BASE_URL/api"
echo ""
