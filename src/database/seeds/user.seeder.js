import User from "../../models/user.model" 
import Role from "../../models/role.model"
import bcrypt from "bcryptjs";

export const createAdmin = async () => {
  // Verifica si existe usuario con este correo
  const user = await User.findOne({ email: "admin@localhost.com" });
  const roles = await Role.find({ name: { $in: ["admin", "user"] } });

  if (!user) {
    await User.create({
      username: "admin",
      email: "admin@localhost.com",
      password: await bcrypt.hash("admin", 10),
      roles: roles.map((role) => role._id),
    });
    console.log('Admin User Created!')
  }
};
