const express = require("express");

const authServices = require("../controllers/authController");
//const auth = require("../middleware/auth");

const router = express.Router();

router.post('/register', authServices.register)

router.post('/login', authServices.logIn)

router.post('/refreshToken', authServices.recreateRefreshToken)

module.exports = router;