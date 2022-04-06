const Users = require("../models/Users");
const jwt = require('jsonwebtoken');

const config = process.env;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            const user = await Users.findOne({ roll: decode.roll });
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}
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
            return res.status(403);
        }
    });
}

module.exports.verifyToken = verifyToken
module.exports.verifyRole = verifyRole
module.exports.verifyAdmin = verifyAdmin


