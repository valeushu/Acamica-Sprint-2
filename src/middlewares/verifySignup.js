import { ROLES } from "../models/role.js";
import User from "../models/user.js";

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(401).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }
  next();
};

export const checkDuplicateEmail = async (req, res, next) => {
  try {
    const{email} = req.body
    const emailRep = await User.findOne({ email: req.body.email });
    console.log(email)
    if (!email) { return res.status(500).json({ status: "information is missing" }) } else {
      if (emailRep)
        return res.status(400).json({ status: "The email already exist" })
    }
  } catch (error) {
    
    console.log(error)
  }
  next();
};
