const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  return username && username.trim().length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
  const user = users.find(u => u.username === username && u.password === password);
  return !!user;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body;
    
  if (!username || !password) {
    return res.status(400).json({ message: "Будь ласка, надайте ім'я користувача та пароль." });
  }

  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Невірне ім'я користувача або пароль." });
  }

  const accessToken = jwt.sign({ username: username }, "access", { expiresIn: "1h" });

  req.session.authorization = { accessToken };

  return res.status(200).json({ message: "Успішний вхід!", accessToken });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  if (req.session.authorization)
  {
    const user = req.session.authorization["Username"]
    const ISBN = req.params.isbn;
    const review = req.body.review;

    if (Object.keys(books[ISBN]["reviews"]).includes(user))
    {
      books[ISBN]["reviews"][user] = review;
      return res.status(200).json({ message: "Review updated successfully" });
    }
    else
    {
      books[ISBN]["reviews"][user] = review;
      return res.status(200).json({ message: "Added new review successfully "});
    }
  }
  else
  {
    return res.status(403).json({ message: "User not logged in" });
  }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  if (req.session.authorization)
  {
    const user = req.session.authorization["Username"]
    const ISBN = req.params.isbn;
    if (Object.keys(books[ISBN]["reviews"]).includes(user))
    {
      delete books[ISBN]["reviews"][user];
      return res.status(200).json({ message: "Review deleted successfully" });
    }
    else
    {
      return res.status(200).json({ message: "User haven't posted any reviews yet" });
    }
  }
  else
  {
    return res.status(403).json({ message: "User not logged in" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
