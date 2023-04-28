import { Router } from 'express';
import UsersController from '../controllers/UserController';
import Validations from '../middlewares/Validations';

const userController = new UsersController();

const router = Router();

router.post('/login', Validations.validateLogin, (req, res) => userController.login(req, res));

router.post(
  '/register',
  Validations.validateToken,
  Validations.validateUser,
  (req, res) => userController.createUser(req, res),
);

router.get('/', (req, res) => userController.getAllUsers(req, res));

router.get('/:id', (req, res) => userController.getUserById(req, res));

export default router;
