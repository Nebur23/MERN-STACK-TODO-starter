import { userModel } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as validation from "../utils/validate.js";

export async function Register(req, res) {
  try {
    const { error } = validation.register(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const emailExist = await userModel.findOne({ email: req.body.email });
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    if (emailExist) return res.status(401).json({ message: "email exists" });
    const user = await userModel({
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
    });

    await user.save();
    res.status(201).json({ message: "User Successfully Created" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "User not created" });
  }
}
export async function Login(req, res) {
  try {
    const { error } = validation.login(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "invalid credentials" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const accessToken = jwt.sign(
        {
          userId: user._id,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "360s" }
      );
      const refreshToken = jwt.sign(
        {
          userId: user._id,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: "1d" }
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, //24hrs*60mins*60sec*1000milliseconds
      });
      res.status(200).json({
        message: `${user.name} you are successfull login`,
        accessToken,
      });
    } else {
      res.status(401).json("invalid password");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "'Login failed'" });
  }
}

export async function handleReFreshToken(req, res) {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    if (!decoded || !decoded.userId) {
      return res.status(403).json({ message: "Forbidden to refresh" });
    }

    const foundUser = await userModel.findById(decoded.userId);
    if (!foundUser) {
      return res.status(403).json({ message: "Forbidden user" });
    }

    const accessToken = jwt.sign(
      {
        userId: foundUser._id,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "360s" }
    );

    res.json({ accessToken });
  } catch (error) {
    console.error("Error during token refresh:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function handleLogout(req, res) {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(204); //No content

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  return res.status(200).json({ message: "cookie cleared" });
}
