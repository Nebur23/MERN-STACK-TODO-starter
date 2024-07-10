import jwt from "jsonwebtoken";
import { userModel } from "../models/users.js";
export const verifyJWT = async (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;
  const myToken = token?.split(" ")[1];
  if (!myToken) {
    return res.status(204).json({ message: "No token provided." });
  }
  try {
    const decode = jwt.verify(myToken, process.env.ACCESS_TOKEN);
    req.user = await userModel.findById(decode.userId);

    if (!req.user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

