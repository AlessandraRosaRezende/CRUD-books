import { Router } from 'express';
import UsersController from '../controllers/UserController';
import validateLogin from '../middlewares/validateLogin';
import validateToken from '../middlewares/auth';

const userController = new UsersController();

const router = Router();

router.post('/login', validateLogin, (req, res) => userController.login(req, res));
router.post('/register', validateToken, (req, res) => userController.createUser(req, res));
router.get('/', (req, res) => userController.getAllUsers(req, res));
// router.get('/role', (req, res) => userController.getRole(req, res));

export default router;