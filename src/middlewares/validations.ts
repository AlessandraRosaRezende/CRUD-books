import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import JWT from '../utils/JWT';

const validator = new JWT();

class Validations {
  static async validateToken(request: Request, _response: Response, next: NextFunction):
  Promise<void> {
    const token = request.headers.authorization;
    if (!token) {
      throw new JsonWebTokenError('Token not found');
    }
    validator.verify(token);

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
    for (let i = 0; i < requiredKeys.length; i += 1) {
      if (!(requiredKeys[i] in book)) {
        return res.status(400).json({ message: `${requiredKeys[i]} is required` });
      }
    }
    next();
  }

  static validateUser(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const requiredKeys = ['email', 'password', 'name'];
    for (let i = 0; i < requiredKeys.length; i += 1) {
      if (!(requiredKeys[i] in user)) {
        return res.status(400).json({ message: `${requiredKeys[i]} is required` });
      }
    }
    next();
  }
}

export default Validations;
