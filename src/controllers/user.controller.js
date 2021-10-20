import User from "../models/user.js";

export const createUser = (req, res) => {
  res.json("creating user");
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ Users: users });
};

export const deleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.userId);
  res.send("User deleted");
};
