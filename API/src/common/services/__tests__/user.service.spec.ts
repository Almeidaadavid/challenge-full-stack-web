import { describe, it, expect, vi, beforeEach } from "vitest";
import { PasswordHelper } from "../../../common/helpers/password.helper";
import { UserService } from "../../../user/services/user.service";
import { UserValidator } from "../../../user/validators/user.validator";

describe("UserService", () => {
  const mockUserRepository = {
    create: vi.fn(),
  };
  let userService: UserService;

  beforeEach(() => {
    vi.restoreAllMocks();
    userService = new UserService(mockUserRepository as any);
  });

  it("should create a new user with a hashed password", async () => {
    const mockUserData = {
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
    };

    vi.spyOn(UserValidator, "validateCreate").mockReturnValueOnce(true);
    vi.spyOn(PasswordHelper, "hash").mockResolvedValueOnce("hashed123");
    mockUserRepository.create.mockResolvedValueOnce({
      id: 1,
      ...mockUserData,
      password: "hashed123",
    });

    const result = await userService.create(mockUserData);

    expect(UserValidator.validateCreate).toHaveBeenCalledWith(mockUserData);
    expect(PasswordHelper.hash).toHaveBeenCalledWith("123456");
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      ...mockUserData,
      password: "hashed123",
    });
    expect(result).toEqual({
      id: 1,
      ...mockUserData,
      password: "hashed123",
    });
  });

  it("should throw an error if validation fails", async () => {
    const invalidUserData = {
      name: "",
      email: "",
      password: "",
    };

    vi.spyOn(UserValidator, "validateCreate").mockImplementation(() => {
      throw new Error("Validation error");
    });

    await expect(userService.create(invalidUserData as any)).rejects.toThrow("Validation error");
  });
});
