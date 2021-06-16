module.exports = app => {
    const book = require("../controller/book.controller");
  
    let router = require("express").Router();
  
    router.get("/all", book.getAllBooks);

    router.get("/:bookId", book.getBookById);

    router.post("/create", book.createBook);  
    
    router.post("/create/page/:bookId", book.addNewPage);  

    router.get("/:bookId/page/:pageNumber", book.getBookPage);

    app.use("/api/book", router);
};