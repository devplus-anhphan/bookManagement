const Users = require("../models/Users");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const refreshTokens = []

const logIn = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await Users.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        }
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s',
        });
        const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        res.json({ accessToken, refreshToken });
        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
}

module.exports.logIn = logIn;
