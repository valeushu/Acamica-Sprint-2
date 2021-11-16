import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import config from "../config.js";
import Role from "../models/role.js";

export const signup = async (req, res) => {
  try {
    const { username, fullname, email, password, phone, address, roles } = req.body;
    const hash = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      username,
      fullname,
      email,
      password: hash,
      phone,
      address,
    });
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }
    const savedUser = await newUser.save();
    console.log(savedUser);
    const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
      expiresIn: 86400, //24 hs
    });
    res.status(200).json({ savedUser, token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "something brokes"});
  }
};

export const login = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );
  if (!userFound) return res.status(400).json({ message: "user not found" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );
  if (!matchPassword) return res.status(401).json({ token: null, message: "invalid password" });
  const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
    expiresIn: 86400,
  });
  res.status(200).json({ status: "login", token });
  req.token = token
  console.log(token)
  
};

export const me = (req, res, next) => {
  res.status(200).json({ status: 'me', data: req.dataUser })
};