const mongoose = require('mongoose');
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        dafault: "Available"
    }
});
module.exports = mongoose.model('Book', bookSchema);