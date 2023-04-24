import { Router } from 'express';
import BookController from '../controllers/BookController';
import validateToken from '../middlewares/auth';

const bookController = new BookController();

const router = Router();

router.get('/', (req, res) => bookController.getAllBooks(req, res));
router.get('/:id', (req, res) => bookController.getBookById(req, res));
router.post('/', validateToken, (req, res) => bookController.createBook(req, res));
router.put('/:id', validateToken, (req, res) => bookController.updateBook(req, res));
router.delete('/:id', validateToken, (req, res) => bookController.deleteBook(req, res));
router.get('/author/search', (req, res) => bookController.getBookByQuery(req, res));

export default router;