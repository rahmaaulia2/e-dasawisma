const { verifyToken } = require("../helpers/jwt");

const Authentication = (req, res, next) => {
  try {
    const access_token = req.headers.authorization;
    // console.log(access_token);
    
    if (!access_token) throw { name: "Unauthenticated" };
    
    const [Bearer, token] = access_token.split(" ");
    if (Bearer !== "Bearer") throw { name: "InvalidToken" };
    
    const verify = verifyToken(token);
    if (!verify) throw { name: "Unauthenticated" };
    
    // console.log(verify,"verify");
    
    req.user = {
      id: verify.id,
      role: verify.role,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = Authentication;
