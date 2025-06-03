var jwt = require('jsonwebtoken');


function createUniqueImageName(image) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${random}_${timestamp}_${image}`;
}


const generateToken = (token) => jwt.sign(token, process.env.SECRET_KEY);
const verifyToken = (token) => jwt.verify(token, process.env.SECRET_KEY);




module.exports = { createUniqueImageName, generateToken, verifyToken };