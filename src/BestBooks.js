import React, { useEffect, useState } from 'react';
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
import { Modal, Button, Form } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth0 } from '@auth0/auth0-react';


function EditBookModal({ book, show, onHide }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedBook = {
      title: title,
      author: author,
      description: description,
    };

    axios
      .put(`https://can-of-books-ppja.onrender.com/books/${book.id}`, updatedBook)
      .then(function (response) {
        // Update the book details on the page
        // You can either refetch the books or update the specific book in the books state
        console.log(response.data);
        onHide(); // Close the modal after successful update
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={handleTitleChange} />
          </Form.Group>
          <Form.Group controlId="formAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" value={author} onChange={handleAuthorChange} />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" value={description} onChange={handleDescriptionChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}


function BestBooks() {
  const [books, setBooks] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();


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
  const deleteBook = (book) => {
    
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
      <button onClick={() => deleteBook(book)}>Delete</button>

      {/* Book Form Modal */}
      <BookFormModal show={showModal} onHide={()=>{setShowModal(false)}}/>
    </>

  )

}



  export default BestBooks
