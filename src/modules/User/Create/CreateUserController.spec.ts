import request from 'supertest';
import app from '../../../app';
import createConnection from "../../../database";
import UserRepository from "../../../repositories/User";
import CreateUserService from "./CreateUserService";
import { clearDB } from '../../../utils';

describe("Create User Controller", () => {
  let userRepository: UserRepository;
  let createUserService: CreateUserService;

  beforeAll(async () => {
    await createConnection();

    userRepository = new UserRepository();
    createUserService = new CreateUserService(userRepository);
  });

  afterAll(async () => {
    await clearDB();
  })

  it("should be able to create a new user", async () => {
    const params: UserType.Create = {
      name: "integration Test",
      username: "integration_test",
      email: "integration@test.com",
    };

    const {status, body} = await request(app).post('/create').send(params)

    expect(status).toBe(200);

    expect(body).toHaveProperty("id");
    expect(body).toHaveProperty("created_at");
  });

  it("should not be able to create a new user", async () => {
    const params: UserType.Create = {
      name: "integration Test exist",
      username: "integration_test",
      email: "integration_exist@test.com",
    };

    const {status, body} = await request(app).post('/create').send(params)

    expect(status).toBe(400);
    expect(body.error).toEqual('User Already Exists');
  });
});
