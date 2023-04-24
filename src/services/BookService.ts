import { BookModel } from '../models/BookModel';
import { NewEntity } from '../types';
import { IBook } from '../types/IBook';
import { IModel } from '../types/IModel';
import { ServiceMessage, ServiceResponse } from '../types/ServiceResponse';

export default class BookService {
  constructor(
    private bookModel: IModel<IBook> = new BookModel(),
  ) { }

  public async getAllBooks(): Promise<ServiceResponse<IBook[]>> {
    const allBooks = await this.bookModel.findAll();
    return { status: 'SUCCESSFUL', data: allBooks };
  }

  public async getBookById(id: number): Promise<ServiceResponse<IBook | ServiceMessage>> {
    const book = await this.bookModel.find(id);
    if (!book) return { status: 'NOT_FOUND', data: { message: `Book ${id} not found` } };
    return { status: 'SUCCESSFUL', data: book };
  }

  static validationBook(book: NewEntity<IBook>): string | null {
    if (!book.title) return 'title is required';
    if (!book.price) return 'price is required';
    if (!book.author) return 'author is required';
    if (!book.isbn) return 'isbn is required';
    return null;
  }

  public async createBook(book: NewEntity<IBook>): Promise<ServiceResponse<IBook | ServiceMessage>> {
    const error = BookService.validationBook(book);
    if (error) return { status: 'INVALID_DATA', data: { message: error } };

    try {
      const newBook = await this.bookModel.create(book);
    
      return { status: 'SUCCESSFUL', data: newBook };
    } catch (e: any) {
      if (e.name == 'SequelizeUniqueConstraintError') {
        return { status: 'CONFLICT', data: { message: "duplicado" } };
      }
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: e.message } };
    }
  }

  public async updateBook(id: number, book: NewEntity<IBook>): Promise<ServiceResponse<ServiceMessage | IBook>> {
    const error = BookService.validationBook(book);
    if (error) return { status: 'INVALID_DATA', data: { message: error } };

    const updatedBook = await this.bookModel.update(id, book);
    if (!updatedBook) return { status: 'NOT_FOUND', data: { message: `Book ${id} not found` } };
    return { status: 'SUCCESSFUL', data: updatedBook };
  }

  public async deleteBook(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const bookFound = await this.bookModel.find(id);
    if (!bookFound) return { status: 'NOT_FOUND', data: { message: `Book ${id} not found` } };

    await this.bookModel.delete(id);
    return { status: 'SUCCESSFUL', data: { message: 'Book deleted' } };
  }
}
