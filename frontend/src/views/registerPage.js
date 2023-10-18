import React from "react";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from "../components/Navbar";

import "./signin.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);

  const [validated, setValidated] = useState(false);

  const [erroruser, setErrorUser] = useState();
  const [errorpassword, setErrorPassword] = useState();

  const handleSubmit = async e => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      console.log("!!!!!")
    }
    else {
    e.preventDefault();
    const regUser = await registerUser(username, password, password2);
    setValidated(true);
    setErrorUser(regUser.username)
    setErrorPassword(regUser.password)
    console.log("!!!!########!!!!!", regUser)
    }
  };

  return (
    <div className="text-center">
    <Navbar props="/register" />
    <section>
      <div className="form-signin w-100 m-auto">
      <h2>Register</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          required 
          type="text" 
          placeholder="Enter Username" 
          onChange={e => setUsername(e.target.value)}
          // isValid={!erroruser}
          isInvalid={!!erroruser}
          />
          {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
          {/* <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback> */}
            <Form.Control.Feedback type="invalid">
              {erroruser}
            </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            required
            type="password" 
            placeholder="Password"
            onChange={e => setPassword(e.target.value)} 
            isInvalid={!!errorpassword}
            // isValid={!errorpassword}
            />
            
          <Form.Control.Feedback type="invalid" className="server-invalid-feedback">
              {errorpassword}
            </Form.Control.Feedback>  
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            required
            type="password" 
            placeholder="Password"
            onChange={e => setPassword2(e.target.value)} />
            <div className="server-invalid-feedback invalid-feedback">
            <p>{password2 !== password ? "Passwords do not match" : ""}</p>
            </div>
            {/* <Form.Control.Feedback type="invalid" >
            <p>{password2 !== password ? "Passwords do not match" : ""}</p>
            
            Please provide a valid state.
          </Form.Control.Feedback> */}
        
        
        
        
        </Form.Group>
        

        <Button variant="primary" type="submit" className="w-100" size="lg">
          Register
        </Button>
      </Form>
      </div>
    </section>
    </div>
  );
}

export default Register;
