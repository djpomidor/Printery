import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import Home from "./views/homePage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import UserCabinet from "./views/UserCabinet";
import CtpPage from "./views/ctpPage";
import PrintSchedulePage from "./views/PrintSchedulePage";
import ManagePage from "./views/managePage";
import TechManage from "./views/TechManage";
import PrintSchedule from "./components/printSchedule/PrintSchedule";



function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <AuthProvider>
          <Switch>
            {/* Приватные маршруты с учетом групп */}
            <PrivateRoute
              component={UserCabinet}
              path="/user-cabinet"
              exact
              allowedGroups={["admin"]}
            />
            <PrivateRoute
              component={PrintSchedulePage}
              path="/print-schedule"
              exact
              allowedGroups={["admin", "technologists", "managers"]}
            />
            <PrivateRoute
              component={TechManage}
              path="/tech"
              exact
              allowedGroups={["technologists"]}
            />
            <PrivateRoute
              component={ManagePage}
              path="/manage"
              exact
              allowedGroups={["managers"]}
            />
            <PrivateRoute
              component={CtpPage}
              path="/ctp"
              exact
              allowedGroups={["ctp_operators"]}
            />
            {/* Публичные маршруты */}
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={Home} path="/" />
          </Switch>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;