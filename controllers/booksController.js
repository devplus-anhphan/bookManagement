const Books = require("../models/Books");

const getAllBooks = async (req, res) => {
    try {
        const books = await Books.find();

        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getSpecBook = async (req, res) => {
    const roll = req.params.roll;

    try {
        const book = await Books.findOne({ roll: roll });

        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createNewBooks = async (req, res) => {
    console.log(req.body);
    const newBooks = new Books({
        title: req.body.title,
        author: req.body.author,
        createdOn: req.body.createdOn,
        status: req.body.status
    })
    try {
        if (!(req.body.status == "borrowed" || req.body.status == "available")) {
            res.status(400).json("Only borrowed or available for the status");
        } else {
            await newBooks.save();

            res.status(201).json(newBooks);
        }


    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

const updateBooks = async (req, res) => {
    const roll = req.params.roll;
    try {
        if (!(req.body.status == "borrowed" || req.body.status == "available")) {
            res.status(400).json("Only borrowed or available");
        }
        else {
            await Books.findOneAndUpdate({
                roll: roll,
            },
                {
                    title: req.body.title,
                    author: req.body.author,
                    createdOn: req.body.createdOn,
                    status: req.body.status
                }
            )
            res.status(200).json("Update Successfully");
        }

    } catch (error) {
        res.status(401).json({ message: error.message });
    }

}

const deleteBooks = async (req, res) => {
    const roll = req.params.roll;

    try {
        await Books.findOneAndRemove({ roll: roll });
        res.status(200).json({ message: "Delete Successfully" });

    } catch (error) {
        res.status(402).json({ message: error.message });
    }
}
// const borrowedBook = async (req, res) => {
//     const roll = req.params.roll;

//     try {
//         await Books.findOneAndUpdate({ roll: roll }, { status: "borrowed" });
//         res.status(200).json({ message: "Book is already borrowed" });

//     } catch (error) {
//         res.status(402).json({ message: error.message });
//     }
// }

// const availableBook = async (req, res) => {
//     const roll = req.params.roll;

//     try {
//         await Books.findOneAndUpdate({ roll: roll }, { status: "available" });
//         res.status(200).json({ message: "You can borrow this book" });


//     } catch (error) {
//         res.status(402).json({ message: error.message });
//     }
// }

module.exports.getAllBooks = getAllBooks;
module.exports.createNewBooks = createNewBooks;
module.exports.getSpecBook = getSpecBook;
module.exports.updateBooks = updateBooks;
module.exports.deleteBooks = deleteBooks;
//module.exports.borrowedBook = borrowedBook;
//module.exports.availableBook = availableBook;