const Users = require("../models/Users");
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    //const refreshToken = req.cookies.refreshToken;
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.status(403).json("Token is not valid!");
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("You're not authenticated");
    }
}
// check if itself or admin
const verifyRole = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.roll == req.params.roll || req.user.admin) {
            next();
        } else {
            return res.status(403);
        }
    });
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.admin) {
            next();
        } else {
            res.status(403).json("You're not allowed to do that!");
        }
    });
}

module.exports.verifyToken = verifyToken
module.exports.verifyRole = verifyRole
module.exports.verifyAdmin = verifyAdmin


