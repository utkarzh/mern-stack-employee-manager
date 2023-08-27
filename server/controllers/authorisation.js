const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const { validateInput } = require("../services/validateInput");

exports.createAdmin = async (req, resp) => {
  const { username, email, password } = req.body;
  if (!validateInput(username, password)) {
    return resp.status(400).json({ message: "Missing Fields !!" });
  }

  try {
    const hashed_password = await bcrypt.hash(password, 10);
    const new_admin = {
      username: username,
      password: hashed_password,
    };
    const ans = await Admin.create(new_admin);
    resp.status(200).json({ message: "Admin created" });
  } catch (error) {
    console.log(error);
    resp.status(400).json({ message: "Admin already exists" });
  }
};

exports.handleLogin = async (req, resp) => {
  const { username, password } = req.body;

  if (!validateInput(username, password)) {
    resp.status(400).json({ message: "Missing Fields" });
  }

  try {
    const admin = await Admin.findOne({ where: { username: username } });
    if (admin) {
      const passwordMatch = await bcrypt.compare(password, admin.password);

      if (passwordMatch) {
        const token = await jwt.sign(
          { adminId: admin.id },
          process.env.JWT_KEY
        );
        resp.status(200).json({ token: token });
      } else {
        resp.status(400).json({ message: "Password Incorrect!" });
      }
    } else {
      resp.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
