import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import JWT from '../utils/JWT';

class Validations {
  static async validateToken(request: Request, _response: Response, next: NextFunction):
  Promise<void> {
    const token = request.headers.authorization;
    if (!token) {
      throw new JsonWebTokenError('Token not found');
    }
    JWT.verify(token);

    next();
  }

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email' });
    }
    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    next();
  }

  static validateBook(req: Request, res: Response, next: NextFunction): Response | void {
    const book = req.body;
    const requiredKeys = ['title', 'price', 'author', 'isbn'];
    const notFoundKey = requiredKeys.find((key) => !(key in book));
    if (notFoundKey) {
      return res.status(400).json({ message: `${notFoundKey} is required` });
    }

    next();
  }

  static validateUser(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const requiredKeys = ['email', 'password', 'name'];
    const notFoundKey = requiredKeys.find((key) => !(key in user));
    if (notFoundKey) {
      return res.status(400).json({ message: `${notFoundKey} is required` });
    }

    next();
  }
}

export default Validations;
