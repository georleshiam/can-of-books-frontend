import React, { useState } from 'react';
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';



function BestBooks(){
  const [books, setBooks] = useState([])

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  let booksDataHTML = books.map((element)=>{ return       <Carousel.Item>
    {element.title}</Carousel.Item>
})

  axios.get('https://can-of-books-ppja.onrender.com/books')
   .then(function (response) {
    setBooks(response.data)

     // handle success
   console.log(response.data);
  })

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
      </>
    )
  
}

export default BestBooks;
