const express = require("express");

const bookServices = require("../controllers/booksController");

const router = express.Router();

router.get('/listbook', bookServices.getAllBooks);
router.get('/details/:roll', bookServices.getSpecBook);
router.post('/create', bookServices.createNewBooks);
router.put('/update/:roll', bookServices.updateBooks);
router.delete('/delete/:roll', bookServices.deleteBooks);

//router.patch('/checkBorrowedBook/:roll', bookServices.borrowedBook)
//router.patch('/checkAvailableBook/:roll', bookServices.availableBook)

module.exports = router;