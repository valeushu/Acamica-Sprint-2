import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";
import Role from "../models/role.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;
    const hash = await bcrypt.hash(password, 10);
    //console.log(hash)
    const newUser = new User({
      username,
      email,
      password: hash,
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
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400, //24 hs
    });
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.send("something brokes");
  }

  /*const { username, email, password, roles } = req.body;
    
    const newUser = new User({
        username,
        email,
        password: User.encryptPassword(password)
    });
    console.log(newUser)
    res.json(newUser)*/
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
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "invalid password" });
  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400,
  });
  //console.log(userFound)
  res.json({ token });
};
