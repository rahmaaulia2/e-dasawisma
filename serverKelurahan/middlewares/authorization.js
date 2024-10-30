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
    next(error);
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
    next(error);
  }
};

const AuthorizationUser = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    // console.log(req.user, "authorization user");
    
    const verifyUser = await User.findByPk(id);
    // console.log(verifyUser, "verify user");
    
    if (!verifyUser) {
      throw { name: "Unauthorized" };
    }
    // console.log(verifyUser.id, id, role);
    
    if (verifyUser.id === id||role === "user" || role === "admin" ) {
      next();
    } else {
      res.status(401).json({ name: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { AuthorizationRole, AuthorizationAdmin, AuthorizationUser };
