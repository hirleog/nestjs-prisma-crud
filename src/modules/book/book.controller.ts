import { BookDTO } from './book.dto';
import { Body, Controller, Param, Post, Get, Put, Delete } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  async create(@Body() data: BookDTO) {
    return this.bookService.create(data)
  }

  @Get()
  async findAll() {
    return this.bookService.findAll()
  }

  @Put(":id")
  async updateBook(@Param(':id') id: string, @Body() data: BookDTO) {
    return this.bookService.updateBook(id, data)
  }

  @Delete(":id")
  async deleteBook(@Param(':id') id: string) {
    return this.bookService.delete(id)
  }

  // @Get(':id')
  // async findById(@Param(':id') id: string) {
  //   return this.bookService.findById(id)
  // }
}
