const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type: String
    },
    author: {
        type: String
    },
    pages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page'
    }]
})

bookSchema.methods.toJSON = function() {

    let book = this;
    let bookObject = book.toObject();
    delete bookObject.__v;

    return bookObject;
}

const BookModel = mongoose.model('Book', bookSchema);
module.exports = BookModel;