import { SequelizeBookModel } from '../models/SequelizeBookModel';
import { NewEntity } from '../types';
import { IBook } from '../types/Books/IBook';
import { IModel } from '../types/Books/IBookModel';
import { ServiceMessage, ServiceResponse } from '../types/ServiceResponse';

export default class BookService {
  constructor(
    private bookModel: IModel<IBook> = new SequelizeBookModel(),
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

    const newBook = await this.bookModel.create(book);
    return { status: 'SUCCESSFUL', data: newBook };
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

  public async getBookByQuery(q: string): Promise<ServiceResponse<IBook[] | ServiceMessage>> {
    const book = await this.bookModel.findByQuery(q);
    if (book && book.length === 0) return { status: 'NOT_FOUND', data: { message: `Author ${q} not found` } };
    
    return { status: 'SUCCESSFUL', data: book };
  }
}
