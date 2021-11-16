import jwt from "jsonwebtoken";
//import config from "../config.js";
import User from "../models/user.js";
import Role from "../models/role.js";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    console.log(token)
    if (!token) return res.status(403).json({ status: "no token provided" });
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.id;
 
    const user = await User.findById(req.userId, { password: 0 });
    console.log(user);
    req.dataUser = user;
    if (!user) return res.status(404).json({ status: "no user found" });
    req.token = token
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ status: "unauthorized" });
  }
};
export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });
  console.log(roles);
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "require admin role" });
};
