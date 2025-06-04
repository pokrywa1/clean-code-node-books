// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {},
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
    },
  });

  // create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      name: 'Bob Wilson',
      email: 'bob@example.com',
    },
  });

  // create sample books
  const book1 = await prisma.book.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      genre: 'Programming',
      authorId: user1.id,
    },
  });

  const book2 = await prisma.book.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'The Pragmatic Programmer: Your Journey to Mastery',
      genre: 'Programming',
      authorId: user2.id,
    },
  });

  const book3 = await prisma.book.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      genre: 'Programming',
      authorId: user1.id,
    },
  });

  const book4 = await prisma.book.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: "You Don't Know JS: Scope & Closures",
      genre: 'JavaScript',
      authorId: user3.id,
    },
  });

  const book5 = await prisma.book.upsert({
    where: { id: 5 },
    update: {},
    create: {
      title: 'Refactoring: Improving the Design of Existing Code',
      genre: 'Programming',
      authorId: user2.id,
    },
  });

  const book6 = await prisma.book.upsert({
    where: { id: 6 },
    update: {},
    create: {
      title: 'JavaScript: The Good Parts',
      genre: 'JavaScript',
      authorId: user3.id,
    },
  });

  console.log({
    articles: { post1, post2 },
    users: { user1, user2, user3 },
    books: { book1, book2, book3, book4, book5, book6 },
  });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
