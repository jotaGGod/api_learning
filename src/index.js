
const express = require('express');
const {request, response} = require("express");

// FAKE DATABASE

let books = [];

// CREATE APP

const app = express();

app.use(express.json());

// APPLY MIDDLEWARES

app.post('/books', (req, res) => {
    const { id, title, author, publishedAt } = req.body
    const book = { id, title, author, publishedAt };
    books.push(book)
    return res.status(201).json(books);
});
app.get("/books", (req, res) => {
    const allBooks = books;
    return res.status(200).json(allBooks);
});
app.get("/books/:book_id", (req, res) => {
    const { book_id } = req.params
    const book = books.find((book) => book.id === book_id)
    if (!book) res.status(404).json("not Found");
    return res.status(200).json(book)
});
app.delete("/books/:book_id", (req, res) => {
    const { book_id } = req.params
    const filteredBooks = books.filter((book) => book.id !== book_id);
    books = filteredBooks;
    return res.status(204).json(books);

})
app.patch("/books/:book_id", (req,  res) => {
    const { author, title, publishedAt } = req.body
    const { book_id } = req.params
    const book = books.find((book) => book.id === book_id);
    book.id = book.id;
    book.title = title ? title : book.title;
    book.author = author ? author : book.author;
    book.publishedAt = publishedAt ? publishedAt : book.publishedAt;
    return res.status(200).json(book);
});

// MAKE SERVER RUN

app.listen(3333, () => console.log('Server is running!'));
