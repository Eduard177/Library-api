const db = require("../modules/database/index");
const Book = db.book;
const Page = db.page;

module.exports = {
  async getAllBooks(req, res, next) {
    try {
      const data = await Book.find().populate('pages', "-_id -__v");
      res.status(200).send(data)
    } catch (error) {
      next(error)
    }
  },
  async getBookById(req, res, next) {
    try {
      const bookId = req.params.bookId;
      if(bookId){
        const book = await Book.findById(bookId).populate('pages', "-_id -__v");
        res.status(200).send(book)
      }
      else{
        res.status(404).send({message: "Not found Book"});
      }
    } catch (error) {
      next(error)
    }
  },
  async createBook(req, res, next) {
    try{
      const book = req.body;
      const newBook = await Book.create(book)
      res.status(201).send(newBook)
    } catch(error){
      next(error)
    }
  },
  async addNewPage(req, res, next){
    try{
      const bookId = req.params.bookId
      const page = new Page({
        page: req.body.page,
        content: req.body.content
      });

      await page.save();

      const newPage = await Book.findByIdAndUpdate(
        bookId,
        {$push: {pages: page._id}},
        {new: true, useFindAndModify: false}
      );

      res.send(newPage)

    } catch(error){
      next(error)
    }
  },
  async getBookPage(req, res, next){
    try {
      const bookId = req.params.bookId;
      const pageNumber = req.params.pageNumber -1;

      if(bookId){
        const book = await Book.findById(bookId).populate('pages', '-_id');
        if(pageNumber < book.pages.lenght){
          res.send(book.pages[pageNumber])
        }
        else{
          res.status(404).send({message: "Not found Page"});
        }
      }
    } catch (error) {
      next(error)
    }
  }
}