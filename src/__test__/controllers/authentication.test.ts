import { login } from "@/controllers/authenticationController";
import { authenticateToken } from "@/middlewares/jwtMiddleware";
import { User } from "@/models/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createMock } from "@golevelup/ts-jest";

jest.mock("jsonwebtoken");
jest.mock("@/models/User");

const mockUser = createMock<User>({
  id: "1",
  email: "test@test.com",
  password: "test",
});

describe("authenticateToken middleware", () => {
  let req: Request;
  let res: Response;
  let next: jest.Mock;

  beforeEach(() => {
    req = createMock<Request>({
      headers: {
        authorization: "Bearer token",
      },
    });
    res = createMock<Response>({
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    });
    next = jest.fn();
    process.env.JWT_SECRET = "test_secret";
  });

  it("should return 401 if no token is provided", async () => {
    req.headers.authorization = undefined;
    await authenticateToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "No token provided" });
  });

  it("should return 401 if token is invalid", async () => {
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });
    await authenticateToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token verification failed" });
  });

  it("should return 401 if token is expired", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ userId: "1", exp: Math.floor(Date.now() / 1000) - (60 * 60) });
    await authenticateToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token has expired" });
  });

  it("should return 406 if user is not found", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ userId: "1", exp: Math.floor(Date.now() / 1000) + (60 * 60) });
    (User.findOne as jest.Mock).mockResolvedValue(null);
    await authenticateToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(406);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("should call next if token is valid and user is found", async () => {
    (jwt.verify as jest.Mock).mockReturnValue({ userId: "1", exp: Math.floor(Date.now() / 1000) + (60 * 60) });
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    await authenticateToken(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});