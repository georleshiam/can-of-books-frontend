import React, { useEffect, useState } from 'react';
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
import { Modal, Button, Form } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import "bootstrap/dist/css/bootstrap.min.css"

function BestBooks() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(true);


  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  let booksDataHTML = books.map((element) => {
    
    
    return <Carousel.Item>
      {element.title}</Carousel.Item>
  })
  
  // Open the modal
  const openModal = () => {
    console.log("test")
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(()=>{
    axios.get('https://can-of-books-ppja.onrender.com/books')
    .then(function (response) {
      setBooks(response.data)

      // handle success
      console.log(response.data);
    })
  },[])
  const deleteBook = (id) => {
    axios
      .delete(`https://can-of-books-ppja.onrender.com/books/${id}`)
      .then(function (response) {
        // Remove the book from the list
        if (response.status === 204) {
          // Remove the book from the list
          setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };




  /* TODO: render all the books in a Carousel */
  if (booksDataHTML.length === 0) {
    booksDataHTML = <p>"No books found."</p>;
  } else {
    console.log("Found " + booksDataHTML.length + " books.");
    // do something with the booksDataHTML variable
  }
  
  return (
    <>
      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
      {booksDataHTML}
      {books.length ? (

        <Carousel>
          {booksDataHTML}
        </Carousel>



      ) : (
        <h3>No Books Found :</h3>
      )}
      {/* Add Book Button */}
      <button onClick={()=>{setShowModal(true)}}>Add Book</button>
    {/* delete book button */}
      <button onClick={() => deleteBook(books.id)}>Delete</button>

      {/* Book Form Modal */}
      <BookFormModal show={showModal} onHide={()=>{setShowModal(false)}}/>
    </>

  )

}



  export default BestBooks
