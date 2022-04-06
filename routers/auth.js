const express = require("express");

const authServices = require("../controllers/authController");
//const auth = require("../middleware/auth");

const router = express.Router();

router.post('/login', authServices.logIn)