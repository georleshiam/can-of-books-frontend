import React, { useEffect } from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Header() {
  const { isAuthenticated, loginWithRedirect, logout, user, getAccessTokenSilently , error, token} = useAuth0();
  const fetchPrivateData = async () => {
    // try {
    //   const token = await getAccessTokenSilently();
      // Make API calls with the obtained token
      console.log(token);
    // } catch (error) {
      console.error(error);
    }
  
  async function SendRequest(){
    let accessToken = await getAccessTokenSilently()
    let headers = {
      Authorization: `Bearer ${accessToken}`
    }
    await axios.get("http://localhost:3001/books", headers=headers)
  }
  SendRequest()


  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        <div>
          {isAuthenticated !== true ? (
            <button onClick={loginWithRedirect}>Log In</button>
          ) : (
            <button onClick={logout}>Log Out</button>

          )}
          <button onClick={fetchPrivateData}>Fetch Private Data</button>

        </div>
      </Navbar>
      </>
  )


}



export default Header;
