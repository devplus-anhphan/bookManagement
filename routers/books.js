const express = require("express");

const bookServices = require("../controllers/booksController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/listbook', auth.verifyToken, bookServices.getAllBooks);
router.get('/details/:roll', auth.verifyToken, bookServices.getSpecBook);
router.post('/create', auth.verifyAdmin, bookServices.createNewBooks);
router.put('/update/:roll', auth.verifyAdmin, bookServices.updateBooks);
router.delete('/delete/:roll', auth.verifyAdmin, bookServices.deleteBooks);

//router.patch('/checkBorrowedBook/:roll', bookServices.borrowedBook)
//router.patch('/checkAvailableBook/:roll', bookServices.availableBook)

module.exports = router;