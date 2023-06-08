import { Modal } from "react-bootstrap"
import { useState } from "react";
import {Form} from "react-bootstrap";
import axios from "axios";
function BookFormModal({show, onHide}){
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
    }
    return <Modal show={show} onHide={onHide}>
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
}

export default BookFormModal