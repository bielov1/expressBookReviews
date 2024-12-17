// client.js

const axios = require('axios');

// Task 10: Get the list of books available in the shop
async function getListOfBooks() {
    try {
        const response = await axios.get('http://localhost:5000/');
        const books = response.data;
        console.log('List of Available Books:', books);
        return books;
    } catch (error) {
        console.error('Error fetching the list of books:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Task 11: Get book details based on ISBN
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        const book = response.data;
        console.log(`Details of Book with ISBN ${isbn}:`, book);
        return book;
    } catch (error) {
        console.error(`Error fetching details for ISBN ${isbn}:`, error.response ? error.response.data : error.message);
        throw error;
    }
}

// Task 12: Get book details based on Author
async function getBooksByAuthor(authorName) {
    try {
        const response = await axios.get(`http://localhost:5000/author/${encodeURIComponent(authorName)}`);
        const books = response.data;
        console.log(`Books by Author "${authorName}":`, books);
        return books;
    } catch (error) {
        console.error(`Error fetching books by author "${authorName}":`, error.response ? error.response.data : error.message);
        throw error;
    }
}

// Task 13: Get book details based on Title
async function getBookByTitle(title) {
    try {
        const response = await axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`);
        const books = response.data;
        console.log(`Details of Book titled "${title}":`, books);
        return books;
    } catch (error) {
        console.error(`Error fetching details for title "${title}":`, error.response ? error.response.data : error.message);
        throw error;
    }
}

// Exporting the functions for use in other modules if needed
module.exports = {
    getListOfBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBookByTitle
};

// Example usage (uncomment to test)
(async () => {
    try {
        await getListOfBooks();
        await getBookByISBN('1');
        await getBooksByAuthor('Jane Austen');
        await getBookByTitle('Pride and Prejudice');
    } catch (error) {
        console.error('Error during API calls:', error);
    }
})();
