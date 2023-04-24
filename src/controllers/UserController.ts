import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async getAllUsers(_req: Request, res: Response) {
    const serviceResponse = await this.userService.getAllUsers();

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }

  // public async createBook(req: Request, res: Response) {
  //   const serviceResponse = await this.bookService.createBook(req.body);

  //   if (serviceResponse.status !== 'SUCCESSFUL') {
  //     return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  //   }

  //   res.status(201).json(serviceResponse.data);
  // }
}
