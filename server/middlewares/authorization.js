const { User } = require("../models");
const AuthorizationRole = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    // console.log(req.user);
    const verifyUser = await User.findByPk(id);
    if (!verifyUser) {
      throw { name: "Unauthorized" };
    }
    if (
      role === "admin" ||
      role === "RW" ||
      role === "RT" ||
      role === "Kelurahan" ||
      role === "Kecamatan"
    ) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const AuthorizationAdmin = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    const verifyUser = await User.findByPk(id);
    if (!verifyUser) {
      throw { name: "Unauthorized" };
    }
    if (role === "admin") {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const AuthorizationUser = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    const verifyUser = await User.findByPk(id);
    if (!verifyUser) {
      throw { name: "Unauthorized" };
    }
    if (role === "user" || role === "admin") {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { AuthorizationRole, AuthorizationAdmin, AuthorizationUser };
