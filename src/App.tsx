import * as React from "react";
// import "./styles.css";
import Layout from "./Layout";
import "bootstrap/dist/css/bootstrap.css"; // Import precompiled Bootstrap css
import "@fortawesome/fontawesome-free/css/all.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TokenProvider } from "./Components/TokenContext";
import { UserProvider } from "./Components/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute";

export default function App() {
  return (
    <TokenProvider>
      <UserProvider>
        <Layout />
      </UserProvider>
    </TokenProvider>
  );
}
