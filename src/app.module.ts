import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [PrismaModule, ArticlesModule, AuthorsModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
