import React, { useState } from 'react';
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';

const Navbar = (props) => {
  console.log("ASDASDASD", props.props);
  const { user, logoutUser } = useContext(AuthContext);
  const [key, setKey] = useState('login');
  return (
    <nav>
      <div>
        <h1>Printery</h1>
        <div>
          {user ? (
            <>
              <Nav variant="tabs" >
                {/* <Nav.Item>
                  <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>*/}
                <Nav.Item>
                <Nav.Link href="/user-cabinet">User Cabinet</Nav.Link>
                </Nav.Item> 
              <button onClick={logoutUser}>Logout</button>
              </Nav>
            </>
          ) : (
            <>
              <Nav variant="tabs" defaultActiveKey={props.props}>
                <Nav.Item>
                  <Nav.Link href="/login" >Login</Nav.Link> 
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/register" >Register</Nav.Link>
                </Nav.Item>  
                <Nav.Item>
                  <Nav.Link href="#" >Contact</Nav.Link>
                </Nav.Item> 
            </Nav>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
