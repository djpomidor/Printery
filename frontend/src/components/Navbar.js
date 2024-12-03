import React, { useState } from 'react';
import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Nav from 'react-bootstrap/Nav';

import BackButton from "./backButton"


const Navbar = (props) => {
  console.log("ASDASDASD", props.props);
  const { user, logoutUser } = useContext(AuthContext);
  const [key, setKey] = useState('login');
  return (
    <div className="mt-32">
    <nav>
      <div>
        <h1 className="mb-10">Printery</h1>
        <div>
          {user ? (
            <>
              <Nav variant="tabs" >
                {/* <Nav.Item>
                  <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>*/}
                <Nav.Item>
                <Nav.Link as={BackButton}>Назад</Nav.Link>
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
    </div>
  );
};

export default Navbar;
