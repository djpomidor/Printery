import React from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from "../components/Navbar";

import "./signin.css";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

return (
  <div className="text-center">
  <Navbar props="/login"/>
  <section>
    <div className="text-center">
    <div className="form-signin w-100 m-auto">
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username"/>
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"/>
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100" size="lg">
        Submit
      </Button>
    </Form>
    </div>
    </div>
  </section>
  </div>
);
};


export default LoginPage;
