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
      role === "rt" ||
      role === "rw" ||
      role === "kelurahan" 
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
    if (role === "kelurahan") {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const AuthorizationRT = async (req, res, next) => {
  try {
    const { id, role } = req.user;
    // console.log(req.user, "authorization user");
    
    const verifyUser = await User.findByPk(id);
    // console.log(verifyUser, "verify user");
    
    if (!verifyUser) {
      throw { name: "Unauthorized" };
    }
    // console.log(verifyUser.id, id, role);
    
    if (verifyUser.id === id||role === "rt" || role === "kelurahan" ) {
      next();
    } else {
      res.status(401).json({ name: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { AuthorizationRole, AuthorizationAdmin, AuthorizationRT };
