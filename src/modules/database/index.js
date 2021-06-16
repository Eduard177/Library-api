const dbConfig = require("../config/index");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.book = require("../model/book/book.model.js");
db.page = require("../model/pages/page.model.js");

module.exports = db;