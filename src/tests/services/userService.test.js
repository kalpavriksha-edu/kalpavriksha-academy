import UserService from "../../service/userService";
import loggerManager from "../../utility/logger";
import jwt from "jsonwebtoken";
import errorConstant from "../../constants/errorConstants";
import dotenv from "dotenv";
dotenv.config();

const userService = new UserService();
const logger = loggerManager.getLogger();
jest.setTimeout(30000);
jest.mock("../../model/userModel", () => {
  return {
    __esModule: true,
    default: {
      findAll: jest.fn(() =>
        Promise.resolve([
          {
            id: 1,
            name: "yogesh",
            email: "yogesh123@gmail.com",
            role: "admin",
          },
          {
            id: 4,
            name: "gajendra",
            email: "gajendra@gmail.com",
            role: "student",
          },
        ])
      ),
      findByPk: jest.fn(() =>
        Promise.resolve({
          dataValues: {
            id: 1,
            name: "yogesh",
            email: "yogesh123@gmail.com",
            role: "admin",
          },
        })
      ),
      create: jest.fn(() =>
        Promise.resolve({
          id: 6,
          name: "saikat",
          email: "saikat@gmail.com",
          password:
            "$2a$10$jYv2KezaZGP054M5e5pOPO/93B0zoCGg7yBKB9yfjFkLQzP.w35uK",
          role: "admin",
        })
      ),
      update: jest.fn(() => Promise.resolve(Promise.resolve([1]))),
      destroy: jest.fn(() => Promise.resolve(Promise.resolve([1]))),
      findOne: jest.fn(() =>
        Promise.resolve(
          Promise.resolve({
            email: "manish@gmail.com",
            password:
              "$2a$10$aeOy9LJrwAUR.ylYcV/SAOUVa9Qk9npLtV6kkUWoMwXPlKTNFih3i",
          })
        )
      ),
    },
  };
});
describe("Test userService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all users ", async () => {
    const expectedUsers = [
      {
        id: 1,
        name: "yogesh",
        email: "yogesh123@gmail.com",
        role: "admin",
      },
      {
        id: 4,
        name: "gajendra",
        email: "gajendra@gmail.com",
        role: "student",
      },
    ];

    const result = await userService.getAllUsers();
    expect(result).toEqual(expectedUsers);
    expect(Array.isArray(result)).toBe(true);
    result.forEach((user) => {
      expect(typeof user).toBe("object");
    });
  });

  it("should throw an error", async () => {
    await userService.getAllUsers().catch((reason) => {
      expect(reason.message).toBe("Internal server Error");
      expect(reason.code).toBe(500);
    });
  });

  it("should return A single user by id", async () => {
    const expectedUsers = {
      id: 1,
      name: "yogesh",
      email: "yogesh123@gmail.com",
      role: "admin",
    };

    const result = await userService.getUserById(1);
    expect(result).toEqual(expectedUsers);
    expect(typeof result).toBe("object");
  });
  it("should throw an error", async () => {
    await userService.getUserById().catch((reason) => {
      expect(reason.message).toBe("Internal server Error");
      expect(reason.code).toBe(500);
    });
  });

  it("should create a new user", async () => {
    const expectedResult = {
      id: 6,
      name: "saikat",
      email: "saikat@gmail.com",
      password: "$2a$10$jYv2KezaZGP054M5e5pOPO/93B0zoCGg7yBKB9yfjFkLQzP.w35uK",
      role: "admin",
    };

    const result = await userService.createNewUser(
      "saikat",
      "saikat@gmail.com",
      "saikat@123",
      "admin"
    );
    expect(result).toEqual(expectedResult);
    expect(typeof result).toBe("object");
  });

  it("should throw an error when arguments are illegal", async () => {
    await userService.createNewUser().catch((reason) => {
      expect(reason.message).toBe("Illegal arguments");
      expect(reason.code).toBe(403);
    });
  });

  it("should update a user", async () => {
    const expectedResult = {
      message: "Successfully Updated",
    };

    const result = await userService.updateUserById(1, {
      name: "dinesh",
      email: "dinesh@gmail.com",
    });
    expect(result).toEqual(expectedResult);
    expect(typeof result).toBe("object");
  });

  it("should throw an error", async () => {
    await userService.updateUserById().catch((reason) => {
      expect(reason.message).toBe("Internal server Error");
      expect(reason.code).toBe(500);
    });
  });

  it("should delete user", async () => {
    const expectedResult = {
      message: "Successfully Deleted",
    };

    const result = await userService.deleteUserById(6);
    expect(result).toEqual(expectedResult);
    expect(typeof result).toBe("object");
  });

  it("should throw an error", async () => {
    await userService.deleteUserById().catch((reason) => {
      expect(reason.message).toBe("Internal server Error");
      expect(reason.code).toBe(500);
    });
  });

  it("should Login", async () => {
    const result = await userService.userLogin(
      "manish@gmail.com",
      "manish@123"
    );
    expect(typeof result).toBe("string");
    const decodedToken = jwt.verify(result, process.env.KEY);
    expect(decodedToken.user.email).toBe("manish@gmail.com");
  });
});
