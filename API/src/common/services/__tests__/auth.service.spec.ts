import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthService } from "../auth.service";
import { PasswordHelper } from "../../helpers/password.helper";
import { TokenHelper } from "../../helpers/token.helper";

describe("AuthService", () => {
  const mockUserRepo = { getByEmail: vi.fn() };
  let authService: AuthService;

  beforeEach(() => {
    vi.restoreAllMocks();
    authService = new AuthService(mockUserRepo as any);
  });

  it("should authenticate user with valid credentials", async () => {
    mockUserRepo.getByEmail.mockResolvedValue({
      id: 1,
      email: "test@mail.com",
      password: "hashedPassword",
    });

    vi.spyOn(PasswordHelper, "compare").mockResolvedValue(true);
    vi.spyOn(TokenHelper, "generate").mockReturnValue("jwt123");

    const result = await authService.login({
      email: "test@mail.com",
      password: "123456",
    });

    expect(result).toEqual({ token: "jwt123", user: { email: "test@mail.com", id: 1 } });
  });

  it("should throw an error for invalid credentials", async () => {
    mockUserRepo.getByEmail.mockResolvedValue(null);

    await expect(
      authService.login({ email: "invalid@mail.com", password: "wrongpass" })
    ).rejects.toThrow();
  });
});