import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/books');
      setBooks(response.data._embedded.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };

  const addBook = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/books', newBook);
      fetchBooks();
      setNewBook({ title: '', author: '' });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="App">
      <h1>Book Catalog</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author}
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Add a New Book</h2>
        <input
          type="text"
          placeholder="Book Title"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Book Author"
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
        />
        <button onClick={addBook}>Add Book</button>
      </div>
    </div>
  );
}

export default App;
