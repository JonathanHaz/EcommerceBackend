// Authentication middleware
const { verifyToken, decodeToken } = require("../utils/jwt");

const auth = (req, res, next) => {
  try {
    const userToken = req.header("authorization");
    if (!userToken) return res.status(401).send("Not Authorized");
    const token = userToken.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload) return res.status(401).send("Not Authorized");
    req.user = payload;

    const userId = decodeToken(token).id;
    console.log("User ID:", userId);

    next();
  } catch (err) {
    return res.status(401).send("Not Authorized");
  }
};

module.exports = { auth };
