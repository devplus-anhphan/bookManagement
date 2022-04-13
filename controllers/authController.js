const Users = require("../models/Users");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const dotenv = require('dotenv')

dotenv.config()

let refreshTokens = []

const register = async (req, res) => {
    try {

        const hashed = await bcrypt.hash(req.body.password, 12);

        //Create new user
        const newUser = await new Users({
            name: req.body.name,
            email: req.body.email,
            password: hashed,
            admin: req.body.admin,
        });

        //Save user to DB
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

const logIn = async (req, res) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json("Incorrect username");
        }
        //console.log(user)
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        //console.log(req.body.password);
        if (!validPassword) {
            res.status(404).json("Incorrect password");
        }

        if (user && validPassword) {
            //create token
            const accessToken = createAccessToken(user)
            //extra token if needed
            const refreshToken = createRefreshToken(user)
            //store refresh token in cookie
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/api/auth/refreshToken",
                sameSite: "strict",
            })
            // receive data except password
            const { password, ...others } = user._doc;
            // user
            res.status(200).json({ ...others, accessToken, refreshToken });
        }
    } catch (err) {
        console.log(err);
    }
}

const createAccessToken = (user) => {
    return jwt.sign({
        id: user.id,
        admin: user.admin
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' })
}

const createRefreshToken = (user) => {
    return jwt.sign({
        id: user.id,
        admin: user.admin
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '365d' })
}

const recreateRefreshToken = (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookie.refreshToken
    if (!refreshToken) {
        return res.status(401).json("You are not authenticated")
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err)
        }
        refreshTokens = refreshTokens.filter((token) => token != refreshToken)
        //create new token
        const newAccessToken = createAccessToken(user)
        const newRefreshToken = createRefreshToken(user)
        refreshTokens.push(refreshToken)
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
        })
        res.status(200).json({ accessToken: newAccessToken });
    })
}

module.exports.register = register;
module.exports.logIn = logIn;
module.exports.recreateRefreshToken = recreateRefreshToken;
