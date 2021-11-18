const Book = require('../models/Book');

const insertBook = async (body) => {
    const book = new Book(body);
    return book.save();
}

const updateBook = async (bookId, body) => {
    const book = Book.findOneAndUpdate({_id: bookId}, body, {new: true, runValidators: true});
    return book;
}

const searchBooks = async (bookName, authorName) => {
    if ((!bookName || bookName === "") && authorName && authorName !== "") {
        const books = await Book.find({ author: { $regex: `.*${authorName}.*`, $options: "i" }});
        return books;
    }
    if ((!authorName || authorName === "") && bookName && bookName !== "") {
        const books = await Book.find({ title: { $regex: `.*${bookName}.*`, $options: "i" }});
        return books;
    }
    const books = await Book.find({
        $or: [
            { title: { $regex: `.*${bookName}.*`, $options: "i" }},
            { author: { $regex: `.*${authorName}.*`, $options: "i" }}
        ]
    });
    return books;
}

module.exports = { insertBook, updateBook, searchBooks };
