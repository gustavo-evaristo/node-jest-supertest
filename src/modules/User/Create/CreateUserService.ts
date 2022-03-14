import { Users } from "../../../entities/User";
import UserRepository from "../../../repositories/User";

export default class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({name, username, email}: UserType.Create): Promise<Users> {

    if (await this.userRepository.exists(username)) {
      throw new Error('User Already Exists');
    }

    const user = this.userRepository.create({ name, username, email});

    return user;
  }
}