const express = require("express");

const userServices = require("../controllers/userController");

const router = express.Router();

router.get('/listUser', userServices.getAllUsers);
router.get('/details/:roll', userServices.getSpecUser);
router.post('/create', userServices.createNewUsers);
router.put('/update/:roll', userServices.updateUsers);
router.delete('/delete/:roll', userServices.deleteUsers);

//router.patch('/checkAdmin/:roll', userServices.isAdmin)
//router.patch('/checkMember/:roll', userServices.isMember)

module.exports = router;