import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import ProtectedRoute from "./Components/ProtectedRoute";

import Header from "./Header";
import Landing from "./Pages/Landing";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import LoadingPage from "./Pages/Loading";

const Layout: React.FC = () => {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/loading" component={LoadingPage} />
          <Route path="/" component={Landing} />
        </Switch>
      </main>
    </Router>
  );
};

export default Layout;
