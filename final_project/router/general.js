const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({message: "Необхідно надати ім'я користувача та пароль!"});
  }
  
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(409).json({message: "Ім'я користувача вже зайняте!"});
  }

  users.push({username: username, password: password});
  return res.status(200).json({message: "Користувач успішно зареєстрований!"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  
  if (book) {
    return res.status(200).send(JSON.stringify(book, null, 4));
  } else {
    return res.status(404).json({message: "Книгу за цим ISBN не знайдено."});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let filteredBooks = [];

  for (let isbn in books) {
    let book = books[isbn];
    if (book.author === author) {
      filteredBooks.push(book);
    }
  }

  if (filteredBooks.length > 0) {
    return res.status(200).send(JSON.stringify(filteredBooks, null, 4));
  } else {
    return res.status(404).json({message: "Не знайдено книг цього автора."});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let filteredBooks = [];

  for (let isbn in books) {
    let book = books[isbn];
    if (book.title === title) {
      filteredBooks.push(book);
    }
  }

  if (filteredBooks.length > 0) {
    return res.status(200).send(JSON.stringify(filteredBooks, null, 4));
  } else {
    return res.status(404).json({message: "Не знайдено книг з даною назвою."});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  
  if (book && book.reviews) {
    return res.status(200).send(JSON.stringify(book.reviews, null, 4));
  } else {
    return res.status(404).json({message: "Відгуків за цим ISBN не знайдено."});
  }
});

module.exports.general = public_users;