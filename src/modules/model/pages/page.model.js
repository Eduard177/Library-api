const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    content: [
        {
            type: String
        }
    ],
})

pageSchema.methods.toJSON = function() {

    let page = this;
    let PageObject = page.toObject();
    delete PageObject.__v;

    return PageObject;
}

const PageModel = mongoose.model('Page', pageSchema);
module.exports = PageModel;