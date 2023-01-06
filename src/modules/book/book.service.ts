import { PrismaService } from '../../database/PrismaService';
import { BookDTO } from './book.dto';
import { Injectable, Get } from '@nestjs/common';

@Injectable()
export class BookService {

    constructor(private prisma: PrismaService) { }

    async create(data: BookDTO) {
        const bookExists = await this.prisma.book.findFirst({
            where: {
                bar_code: data.bar_code
            }
        })

        if (bookExists) {
            throw new Error('Book already exists')
        }

        const book = await this.prisma.book.create({
            data,
        });
        return book;
    }

    async findAll() {
        return this.prisma.book.findMany()
    }

    async updateBook(id: string, data: BookDTO) {
        const bookExists = await this.prisma.book.findUnique({
            where: {
                id,
            },
        });

        if (!bookExists) {
            throw new Error('Book do not exists')
        }
        return await this.prisma.book.update({
            data,
            where: {
                id
            },
        });
    }

    async delete(id: string) {
        const bookExissts = await this.prisma.book.findUnique({
            where: {
                id,
            },
        });

        if (!bookExissts) {
            throw new Error('Book do not exists')
        }

        const deleted =  await this.prisma.book.delete({
            where: {
                id, 
            }
        }) 
        return deleted;
    }


    // async findById(id: string) {
    //     return await this.prisma.book.findUnique({
    //        where: {
    //         id,
    //        } 
    //     })
    // }
    // findOne(id: number): Promise<BookDTO> {
    //     return this.prisma.book.findUnique({ id });
    //   }
}
