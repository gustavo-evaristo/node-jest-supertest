import { Request, Response } from "express";
import CreateUserService from "./CreateUserService";

export default class CreateUserController {
  constructor(private createUser: CreateUserService) {}

  async handle(req: Request, res: Response) {
      const { name, username, email }: UserType.Create = req.body;
      
      const user = await this.createUser.execute({ name, username, email });

      return res.status(200).json(user);
  }
}
