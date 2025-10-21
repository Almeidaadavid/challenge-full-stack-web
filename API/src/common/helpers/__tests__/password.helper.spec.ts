import { describe, it, expect, vi, beforeEach } from "vitest";
import { PasswordHelper } from "../password.helper";
import * as bcrypt from "bcrypt";

vi.mock("bcrypt", () => ({
  hash: vi.fn().mockResolvedValue("hashed123"),
  compare: vi.fn().mockResolvedValue(true),
}));

describe("PasswordHelper", () => {
  it("should generate a correct password hash", async () => {
    const result = await PasswordHelper.hash("password123");
    expect(result).toBe("hashed123");
    expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
  });

  it("should compare passwords correctly", async () => {
    const result = await PasswordHelper.compare("plain", "hashed");
    expect(result).toBe(true);
    expect(bcrypt.compare).toHaveBeenCalledWith("plain", "hashed");
  });
});
