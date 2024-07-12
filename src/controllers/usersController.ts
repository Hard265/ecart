import { Response } from "express";
import { User } from "../models/User";
import { AuthenticatedRequest } from "../@types";

export const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
  const users = (
    await User.findAll({ attributes: { exclude: ["password"] } })
  ).map((user) => user.toJSON());

  res.json(users);
};

export const getUserByUsername = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const user = await User.findOne({
    where: { username: req.params.username },
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.json(user.toJSON());
  }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    await user.update(req.body);
    res.json(user.toJSON());
  }
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.destroy({ where: { username: req.params.username } });
  if (!user) {
    res.status(404).json({ message: "User not found" });
  } else {
    res.json({ message: "User deleted" });
  }
};
