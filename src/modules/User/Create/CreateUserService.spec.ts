import createConnection from "../../../database";
import UserRepository from "../../../repositories/User";
import CreateUserService from "./CreateUserService";
import { clearDB } from '../../../utils';

describe("Create User Service", () => {
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
      name: "Unit Test",
      username: "unit_test",
      email: "unit@test.com",
    };

    const user = await createUserService.execute(params);

    expect(user).toHaveProperty("id");
    expect(user.username).toBe("unit_test");
  });

  it("should not be able to create a new user", async () => {
    const params: UserType.Create = {
      name: "unit Test exist",
      username: "unit_test",
      email: "unit_existg@jest.com",
    };

    expect(async () => await createUserService.execute(params)).rejects.toThrow(
      "User Already Exists"
    );
  });
});
