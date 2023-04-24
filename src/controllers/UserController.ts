import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { JsonWebTokenError } from 'jsonwebtoken';
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

  public async login(req: Request, res: Response) {
    const serviceResponse = await this.userService.login(req.body);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    return res.status(200).json({ token: serviceResponse.data.message });
  }

  public async createUser(req: Request, res: Response) {
    if (req.body.user.role !== 'admin') {
      throw new JsonWebTokenError('You are not authorized to create a user');
    }

    const serviceResponse = await this.userService.createUser(req.body);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(201).json(serviceResponse.data);
  }
}
