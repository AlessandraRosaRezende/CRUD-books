import { Request, Response } from 'express';
import BookService from '../services/BookService';
import { JsonWebTokenError } from 'jsonwebtoken';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class BookController {
  constructor(
    private bookService = new BookService(),
  ) { }

  public async getAllBooks(_req: Request, res: Response) {
    const serviceResponse = await this.bookService.getAllBooks();

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }

  public async getBookById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.bookService.getBookById(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }

  public async createBook(req: Request, res: Response) {
    if (req.body.user.role !== 'admin') {
      throw new JsonWebTokenError('You are not authorized to create a book');
    }
    const serviceResponse = await this.bookService.createBook(req.body);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(201).json(serviceResponse.data);
  }

  public async updateBook(req: Request, res: Response): Promise<Response> {
    if (req.body.user.role !== 'admin') {
      throw new JsonWebTokenError('You are not authorized to update a book');
    }
    const id = Number(req.params.id);
    const book = req.body;
    const serviceResponse = await this.bookService.updateBook(id, book);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  };

  public async deleteBook(req: Request, res: Response): Promise<Response> {
    if (req.body.user.role !== 'admin') {
      throw new JsonWebTokenError('You are not authorized to delete a book');
    }
    const id = Number(req.params.id);
    const serviceResponse = await this.bookService.deleteBook(id);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  };

  public async getBookByQuery(req: Request, res: Response) {
    const { q } = req.query;

    const serviceResponse = await this.bookService.getBookByQuery(q as string);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }
}
