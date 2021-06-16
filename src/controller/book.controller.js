const db = require("../modules/database/index");
const Book = db.book;
const Page = db.page;

module.exports = {
  async getAllBooks(req, res, next) {
    try {
      const data = await Book.find().populate('pages', "-_id -__v");
      res.status(200).send(data)
    } catch (error) {
      res.send({message: error.message})
    }
  },
  async getBookById(req, res, next) {
    try {
      const {bookId} = req.params;
      if(!bookId){
        res.status(404).send({message: "Not found Book"});
      }
      const book = await Book.findById(bookId).populate('pages', "-_id -__v");
      res.status(200).send(book)

    } catch (error) {
      res.send({message: error.message})
    }
  },
  async createBook(req, res, next) {
    try{
      const book = req.body;
      const newBook = await Book.create(book)
      res.status(201).send(newBook)
    } catch(error){
      res.send({message: error.message})
    }
  },
  async addNewPage(req, res, next){
    try{
      const {bookId} = req.params;
      const {content} = req.body;
      const page = new Page({content});

      await page.save();

      const newPage = await Book.findByIdAndUpdate(
        bookId,
        {$push: {pages: page._id}},
        {new: true, useFindAndModify: false}
      );

      res.send(newPage)

    } catch(error){
      res.send({message: error.message})
    }
  },
  async getBookPage(req, res, next){
    try {
      let {bookId, pageNumber} = req.params
      pageNumber--

      if(!bookId){
        res.status(403).send({message: "bookId need to be send"});
      }

      const book = await Book.findById(bookId).populate('pages', '-_id');
      if(!pageNumber > book.pages.length){
        res.status(404).send({message: "Not found Page"});
      }
      res.send(book.pages[pageNumber]);
    } catch (error) {
      res.send({message: error.message})
    }
  }
}