import { describe, it, expect, vi, beforeEach } from "vitest";
import { TokenHelper } from "../token.helper";
import jwt from "jsonwebtoken";

describe("TokenHelper", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should generate a valid JWT token", () => {
    const signMock = vi.spyOn(jwt, "sign").mockReturnValue("fake.jwt.token" as never);
    const token = TokenHelper.generate(1);

    expect(token).toBe("fake.jwt.token");
    expect(signMock).toHaveBeenCalledWith(
      { id: 1 },
      process.env.JWT_TOKEN ?? "",
      { expiresIn: "1d" }
    );
  });

  it("should validate a JWT token correctly", () => {
    const verifyMock = vi.spyOn(jwt, "verify").mockReturnValue({ id: 1 } as never);
    const payload = TokenHelper.valid("fake.jwt.token");

    expect(payload).toEqual({ id: 1 });
    expect(verifyMock).toHaveBeenCalledWith("fake.jwt.token", process.env.JWT_TOKEN ?? "");
  });
});