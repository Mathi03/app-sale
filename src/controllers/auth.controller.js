import User from "../models/user.model";
import Role from "../models/role.model";

import jwt from "jsonwebtoken";
import config from "../config";

export const signUp = async (req, res) => {
  try {
    // Getting the Request Body
    const { username, email, password} = req.body;
    // Creating a new User Object
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    // checking for roles
    // if (req.body.roles) {
    //   const foundRoles = await Role.find({ name: { $in: roles } });
    //   newUser.roles = foundRoles.map((role) => role._id);
    // } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    // }

    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: config.EXPIRED_IN
    });

    return res.status(200).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: [ {name: role.name} ],
      token 
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const signin = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles", {_id: 0}
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const comparePassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!comparePassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: config.EXPIRED_IN,
    });

    res.json({ 
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      roles: userFound.roles,
      token
    });
  } catch (error) {
    console.log(error);
  }
};
