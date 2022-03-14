import { Connection } from 'typeorm';
import createConnection from '../../../database';
import UserRepository from "../../../repositories/User";
import CreateUserService from "./CreateUserService";

describe('Create User', () => {
    let userRepository: UserRepository;
    let createUserService: CreateUserService;
    let connection: Connection;

    beforeAll(async () => {
        connection = await createConnection();

        userRepository = new UserRepository();
        createUserService = new CreateUserService(userRepository);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it('should be able to create a new user', async () => {

        const params: UserType.Create = {
            name: 'User Test',
            username: 'test_jest',
            email: 'test@jest.com'
        };

        const user = await createUserService.execute(params);

        expect(user).toHaveProperty('id');
        expect(user.username).toBe('test_jest');

    });

         
    it('should not be able to create a new user', async () => {

        const params: UserType.Create = {
            name: 'User Test existing',
            username: 'test_jest',
            email: 'test_existing@jest.com'
        };

        expect(async () => await createUserService.execute(params)).rejects.toThrow('User Already Exists');
    });
}) 