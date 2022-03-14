import UserRepository from '../../../repositories/User';
import CreateUserController from './CreateUserController';
import CreateUserService from './CreateUserService';

const CreateUser = (): CreateUserController => {
    const userRepository = new UserRepository();
    const userService = new CreateUserService(userRepository);
    const userController = new CreateUserController(userService);
    return userController;
};

export default CreateUser;