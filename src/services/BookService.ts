import BookModel, {BookCreationAttributes, BookModelType } from '../database/models/Book';
import { Book } from '../types/Book';
import { ServiceResponse } from '../types/ServiceResponse';

// const properties = ['title', 'price', 'author', 'isbn'];

export default class BookService {
  constructor(
    private bookModel = BookModel,
  ) {}

  public async getAllBooks(): Promise<ServiceResponse<BookModelType[]>> {
    const allBooks = await this.bookModel.findAll();

    return { status: 'SUCCESSFUL', data: allBooks };
  }

  public async getBookById(id: number): Promise<ServiceResponse<BookModelType>> {
    const book = await this.bookModel.findByPk(id);

    if (!book) return { status: 'NOT_FOUND', data: { message: `Book ${id} not found` } };

    return { status: 'SUCCESSFUL', data: book };
  }
   
  static validationBook(book: BookCreationAttributes): string | null {
    if (!book.title) return 'title is required';
    if (!book.price) return 'price is required';
    if (!book.author) return 'author is required';
    if (!book.isbn) return 'isbn is required';
    return null;
  }

  public async createBook(book: BookCreationAttributes): Promise<ServiceResponse<Book>> {
    let responseService: ServiceResponse<Book | any>;

    const error = BookService.validationBook(book);
  
    if (error) {
      responseService = { status: 'INVALID_DATA', data: { message: error } };
      return responseService;
    }

    const newBook = await this.bookModel.create(book);
    
    responseService = { status: 'SUCCESSFUL', data: newBook };

    return responseService;
  }

  public async updateBook(id: number, book: BookCreationAttributes): Promise<ServiceResponse<Book>> {
    let responseService: ServiceResponse<Book | any>;

    const error = BookService.validationBook(book);
  
    if (error) {
      responseService = { status: 'INVALID_DATA', data: { message: error } };
      return responseService;
    }

    const bookFound = await this.bookModel.findByPk(id);

    if (!bookFound) return { status: 'NOT_FOUND', data: { message: `Book ${id} not found` } };

    const bookUpdated = await this.bookModel.update({ ...book}, { where: { id } });

    responseService = { status: 'SUCCESSFUL', data: bookUpdated };

    return responseService;
  }

  public async deleteBook(id: number): Promise<ServiceResponse<Book>> {
    let responseService: ServiceResponse<Book | any>;
    
    const bookFound = await this.bookModel.findByPk(id);

    if (!bookFound) return { status: 'NOT_FOUND', data: { message: `Book ${id} not found` } };

    const bookDeleted = await this.bookModel.destroy({ where: { id } });

    responseService = { status: 'SUCCESSFUL', data: bookDeleted };

    return responseService;
  }
}
