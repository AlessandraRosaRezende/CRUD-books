import { Router } from 'express';
import UsersController from '../controllers/UserController';
import Validations from '../middlewares/validations';

const userController = new UsersController();

const router = Router();

router.post('/login', Validations.validateLogin, (req, res) => userController.login(req, res));
router.post('/register', Validations.validateToken, Validations.validateBook, (req, res) =>
  userController.createUser(req, res));
router.get('/', (req, res) => userController.getAllUsers(req, res));

export default router;
