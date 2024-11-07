const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.Role.name,
    },
    secret
  );
}
function verifyToken(token) {
  // console.log(secret, token);
  return jwt.verify(token, secret);
}
module.exports = { generateToken, verifyToken };
