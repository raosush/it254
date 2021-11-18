const Book = require('../models/Book');

const { insertBook, updateBook, searchBooks } = require('../services/books');

const bookRouter = require('express').Router();

bookRouter.get('/', async (request, response) => {
    try {
        if (!request.query.bookName && !request.query.authorName) {
            const books = await Book.find({});
            response.status(200).json(books);
            return;
        }
        const { bookName, authorName } = request.query;
        const books = await searchBooks(bookName, authorName);
        response.status(200).json(books);
    } catch (err) {
        console.log(err);
        response.status(500).json({ error: err.message });
    }
})

bookRouter.post("/", async (request, response) => {
    try {
        const body = request.body;
        const book = await insertBook(body);

        response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(400).json({ error: error.message });
    }
});

bookRouter.get("/:id", async (request, response) => {
    try {
        const id = request.params.id;
        let book = await Book.findById(id);
        book = book.toJSON();
        if (book) {
            response.status(200).json(book);
        } else {
            response.status(404).send();
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
})

bookRouter.put("/:id", async (request, response) => {
    try {
        const bookId = request.params.id;
        const body = request.body;

        const book = await updateBook(bookId, body);
        response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(400).json({ error: error.message });
    }
});

bookRouter.delete("/:id", async (request, response) => {
    try {
        const id = request.params.id;
        await Book.deleteOne({ _id: id });
        response.status(204).send()
    } catch (err) {
        console.log(err.message);
        response.status(400).json({ error: error.message });
    }
});

module.exports = bookRouter;
