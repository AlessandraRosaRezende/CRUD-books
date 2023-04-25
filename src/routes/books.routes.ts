import { Request, Router, Response } from 'express';
import BookController from '../controllers/BookController';
import validateBook from '../middlewares/validateBook';

const bookController = new BookController();

const router = Router();

router.get('/', (req: Request, res: Response) => bookController.getAllBooks(req, res));
router.get('/:id', (req: Request, res: Response) => bookController.getBookById(req, res));
router.post('/', validateBook, (req: Request, res: Response) => bookController.createBook(req, res));
router.put('/:id', validateBook, (req: Request, res: Response) => bookController.updateBook(req, res));
router.delete('/:id', (req: Request, res: Response) => bookController.deleteBook(req, res));

export default router;