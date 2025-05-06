import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/userModel";
import { signToken } from "../middlewares/jwtAuth";

export const Signup = async (req: Request, res: Response) => {
  const newUser = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: newUser.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email_exists" });
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    const user = await UserModel.create(newUser);
    const token = signToken({ id: user._id });

    res.status(201).json({ user, token });
    return;
  } catch (err: any) {
    console.error("Server error in register controller", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const Signin = async (req: Request, res: Response) => {
  const signInCredentials = req.body;
  try {
    let userExists = await UserModel.findOne({
      email: signInCredentials.email,
    });

    if (!userExists) {
      return res.status(500).json({ message: "USER_NOT_EXIST" });
    }

    let isPasswordCorrect = bcrypt.compareSync(
      signInCredentials.password,
      userExists.password
    );

    if (!isPasswordCorrect) {
      return res.status(500).json({ message: "WRONG_PASSWORD" });
    }

    const token = signToken({ id: userExists._id });
    res.status(201).json({ user: userExists, token, isAllowed: true });
    return;
  } catch (err: any) {
    console.error("Server Error in Signin", err.message);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
