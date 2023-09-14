import React from "react";
import "./index.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Home from "./views/homePage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import ProtectedPage from "./views/ProtectedPage";
import UserCabinet from "./views/UserCabinet";
import CreateOrder from "./components/orders/CreateOrder";
import PrintSchedulePage from "./views/PrintSchedulePage"

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <AuthProvider>
          
          {/* <div className="text-center flex flex-col min-h-screen overflow-hidden"> */}
          
          <Switch>
            <PrivateRoute component={UserCabinet} path="/user-cabinet" exact />
            <PrivateRoute component={CreateOrder} path="/create-order" exact />
            <PrivateRoute component={PrintSchedulePage} path="/print-schedule" exact />
            {/* <PrivateRoute component={Manage} path="/manage" exact /> */}
            <PrivateRoute component={ProtectedPage} path="/protected" exact />
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={Home} path="/" />
            
          </Switch>
          {/* <Footer /> */}
          
        </AuthProvider>
        
      </div>
    </Router>
  );
}

export default App;
