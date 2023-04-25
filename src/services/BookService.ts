import BookModel from '../models/BookModel';
import { IBook, INewBook } from '../interfaces/books/IBook';
import { IBookModel } from '../interfaces/books/IBookModel';
import { ServiceMessage, ServiceResponse } from '../interfaces/ServiceResponse';

export default class BookService {
  constructor(
    private bookModel: IBookModel = new BookModel(),
  ) { }

  public async getAllBooks(): Promise<ServiceResponse<IBook[]>> {
    const allBooks = await this.bookModel.findAll();
    return { status: 'successful', data: allBooks };
  }

  public async getBookById(id: number): Promise<ServiceResponse<IBook | ServiceMessage>> {
    const book = await this.bookModel.find(id);
    if (!book) return { status: 'notFound', data: { message: `Book ${id} not found` } };
    return { status: 'successful', data: book };
  }

  public async createBook(book: INewBook):
  Promise<ServiceResponse<IBook | ServiceMessage>> {
    const newBook = await this.bookModel.create(book);
    return { status: 'successful', data: newBook };
  }

  public async updateBook(id: number, book: INewBook):
  Promise<ServiceResponse<ServiceMessage | IBook>> {
    const updatedBook = await this.bookModel.update(id, book);
    if (!updatedBook) return { status: 'notFound', data: { message: `Book ${id} not found` } };
    return { status: 'successful', data: updatedBook };
  }

  public async deleteBook(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const bookFound = await this.bookModel.find(id);
    if (!bookFound) return { status: 'notFound', data: { message: `Book ${id} not found` } };

    await this.bookModel.delete(id);
    return { status: 'successful', data: { message: 'Book deleted' } };
  }

  public async getBookByQuery(q: string): Promise<ServiceResponse<IBook[] | ServiceMessage>> {
    const book = await this.bookModel.findByQuery(q);
    if (book && book.length === 0) {
      return { status: 'notFound', data: { message: `Author ${q} not found` } };
    }

    return { status: 'successful', data: book };
  }
}
