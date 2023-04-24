import { NextFunction, Request, Response } from "express";
import BadRequest from "./httpExceptions/HttpBadRequest";

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.email || !req.body.password) {
        throw new BadRequest("All fields must be filled");  
    }
    next();
}

export default validateLogin;