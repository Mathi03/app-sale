import User from "../models/user.model";
import Role from "../models/role.model";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      username,
      email,
      password,
      // roles: rolesFound.map((role) => role._id),
    });

    if (req.body.roles) {
      user.roles = rolesFound.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      user.roles = [role._id];
    }
    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find().populate('roles', {_id: 0});
  return res.json(users);
};

export const getUserId = async (req, res) => {
  const { userId } = req.params;
  
  const user = await User.findById(userId).populate('roles');
  res.status(200).json(user);
};

export const updateUserById = async (req, res) => {
  const rolesFound = await Role.find({ name: { $in: req.body.roles} });
  if (req.body.roles) {
    req.body.roles = rolesFound.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    req.body.roles = [role._id];
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    {
      new: true
    }
  ).populate('roles');
  res.status(200).json(updatedUser);
}

export const deteleUserById = async (req, res) => {
  const { userId } = req.params;
  await User.findByIdAndDelete(userId);
  res.status(204).json();
}
