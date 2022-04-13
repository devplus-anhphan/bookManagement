const express = require("express");

const userServices = require("../controllers/userController");
const authServices = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/listUser', auth.verifyAdmin, userServices.getAllUsers);
router.get('/details/:roll', auth.verifyRole, userServices.getSpecUser);
router.post('/create', auth.verifyAdmin, authServices.register);
router.put('/update/:roll', auth.verifyAdmin, userServices.updateUsers);
router.delete('/delete/:roll', auth.verifyRole, userServices.deleteUsers);

//router.patch('/checkAdmin/:roll', userServices.isAdmin)
//router.patch('/checkMember/:roll', userServices.isMember)

module.exports = router;