import { useContext } from "react";
import AuthContext from "../context/AuthContext";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import "./signin.css";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

//   return (
//     <section>
//       <form onSubmit={handleSubmit}>
//         <h1>Login </h1>
//         <hr />
//         <label htmlFor="username">Username</label>
//         <input type="text" id="username" placeholder="Enter Username" />
//         <label htmlFor="password">Password</label>
//         <input type="password" id="password" placeholder="Enter Password" />
//         <button type="submit">Login</button>
//       </form>
//     </section>
//   );
// };


return (
  <section>
    <div className="text-center">
    <div className="form-signin w-100 m-auto">
    <Form className=" " onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username"/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
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
);
};


export default LoginPage;
