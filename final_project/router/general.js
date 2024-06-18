const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    //Write your code here
    const username = req.query.username;
    const password = req.query.password;

    if (username && password) {
        if (!doesExist(username)) { 
            users.push({"username":username,"password":password});
            return res.status(200).json({message: "User successfully registred. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //Write your code here
    res.send(JSON.stringify({books},null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    const book = Object.values(books).find(book => book.isbn === isbn);

    if (book) {
        res.send(JSON.stringify(book, null, 4));
    } else {
        res.send(`Book with ISBN ${isbn} not found.`);
    }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    const author = req.params.author;
    const book = Object.values(books).find(book => book.author === author);

    if (book) {
        res.send(JSON.stringify(book, null, 4));
    } else {
        res.send(`Book with author name ${author} not found.`);
    }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    //Write your code here
    const title = req.params.title;
    const book = Object.values(books).find(book => book.title === title);

    if (book) {
        res.send(JSON.stringify(book, null, 4));
    } else {
        res.send(`Book with title ${title} not found.`);
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = Object.values(books).find(book => book.isbn === isbn);
    const review = book.reviews;
    if (book) {
        res.send(JSON.stringify(review, null, 4));
    } else {
        res.send(`Book with ISBN ${isbn} not found.`);
    }
});

module.exports.general = public_users;
