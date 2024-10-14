const jwt = require("jsonwebtoken");
const secret = process.env.jwt_secret

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    secret
  );
}
function verifyToken(token) {
  // console.log(secret);
  return jwt.verify(token, secret);
}
module.exports = { generateToken, verifyToken };
