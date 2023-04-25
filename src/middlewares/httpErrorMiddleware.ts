import { NextFunction, Request, Response } from 'express';
import HttpException from './httpExceptions/HttpException';

const errorMiddleware = (error: Error, req: Request, res: Response, _next: NextFunction) => {
  const { status = 500, message } = error as HttpException;
  return res.status(status).json({ message });
};

export default errorMiddleware;
