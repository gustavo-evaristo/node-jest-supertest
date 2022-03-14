import { Users } from "../../entities/User";
import { getRepository } from "typeorm";

export default class UserRepository {
  async exists(username: string): Promise<boolean> {
    const User = getRepository(Users);

    const userExists = await User.findOne({ username });

    return !!userExists;
  }

  async create({ name, username, email }: UserType.Create): Promise<Users> {
    const User = getRepository(Users);

    const user = User.create({
      name,
      username,
      email,
    });

    await User.save(user);

    return user;
  }
}
