import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/user.model";
import Role from "../models/role.model";

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log("Token recibido", token, config.SECRET)
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.SECRET, async (err, decoded) => {
    if (err) return res.status(401).send({
        message: "Unauthorized!"
      });
    
    const user = await User.findById(decoded.id, { password: 0 });
    if (!user) return res.status(404).json({ message: "No user found" });
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};
const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
};
module.exports = authJwt;
