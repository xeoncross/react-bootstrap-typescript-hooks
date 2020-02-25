import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { UserConsumer } from "./UserContext";

// TODO https://stackoverflow.com/questions/47747754/how-to-rewrite-the-protected-private-route-using-typescript-and-react-router-4-a
interface providerprops {
  children?: React.ReactElement
  component: any
  path: string
}

// ProtectedRoute
const ProtectedRoute = ({ component: Component, ...rest }: providerprops) => (
  <UserConsumer>
    {({ user }: any) => (
      <Route
        render={props =>
          user ? <Component {...props} /> : <Redirect to="/" />
        }
        {...rest}
      />
    )}
  </UserConsumer>
);

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired
};

export default ProtectedRoute;
