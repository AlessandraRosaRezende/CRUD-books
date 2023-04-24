import { Router } from 'express';
import UsersController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';

const userController = new UsersController();

const router = Router();

// router.post('/', validateLogin, (req, res) => userController.login(req, res));
// router.post('/register', (req, res) => userController.createUser(req, res));
router.get('/', (req, res) => userController.getAllUsers(req, res));
// router.get('/role', (req, res) => userController.getRole(req, res));

export default router;