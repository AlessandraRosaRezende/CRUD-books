import { Request, Response, NextFunction } from 'express';

const validateBook = (req: Request, res: Response, next: NextFunction): void => {
  const book = req.body;

  const requiredkeys = ['title', 'price', 'author', 'isbn'];

  requiredkeys.forEach((key) => {
    if (!(key in book)) return res.status(400).json({ message: `${key} is required` });
  });

  next();
};

export default validateBook;
