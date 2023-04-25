import { NextFunction, Request, Response } from "express";

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
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

export default validateLogin;