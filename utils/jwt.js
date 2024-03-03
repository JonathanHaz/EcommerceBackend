const jwt = require('jsonwebtoken')
const jwtSecret = "shtak"

const generateToken = (payload) =>{
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1d" });
    return token;
}

const verifyToken = (token) =>{
    const payload = jwt.verify(token,jwtSecret);
    // console.log(payload);
    return payload;
};

const decodeToken = (token) => {
    try {
      const decoded = jwt.verify(token, jwtSecret);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; // Return null or handle the error appropriately
    }
  };

module.exports = { generateToken, verifyToken, decodeToken }