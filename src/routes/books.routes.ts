import { Router } from 'express';
import BookController from '../controllers/BookController';

const bookController = new BookController();

const router = Router();

router.get('/', (req, res) => bookController.getAllBooks(req, res));
router.get('/:id', (req, res) => bookController.getBookById(req, res));
router.post('/', (req, res) => bookController.createBook(req, res));
router.put('/:id', (req, res) => bookController.updateBook(req, res));
router.delete('/:id', (req, res) => bookController.deleteBook(req, res));

export default router;