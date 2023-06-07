import React, { useEffect, useState } from 'react';
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
import { Modal, Button, Form } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css"



function BestBooks() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);


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
      <button onClick={openModal}>Add Book</button>

      {/* Book Form Modal */}
      <BookFormModal show={showModal} onHide={closeModal} />
    </>

  )

}
function BookFormModal({ show, onHide }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  console.log(show)

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      title: title,
      description: description,
      status: status,
    };
    // Perform book creation logic or API call
    // ...
    axios
      .post('https://can-of-books-ppja.onrender.com/books', newBook)
      .then(function (response) {
        // Pass the new book data to the parent component
        // Clear the form inputs
        setTitle('');
        setDescription('');
        setStatus('');

        // // Close the modal
        // onHide();
      });


    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Form.Group>
            {/* <button onClick={function(){

            }}>Add Book</button> */}
            {/* <Button variant="primary" type="submit">
              Add Book
            </Button> */}
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}


  export default BestBooks
