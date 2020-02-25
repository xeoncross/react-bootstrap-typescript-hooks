import React, { useContext, useState, useEffect, Context } from "react";
import useLocalStorage from "./useLocalStorage";

// This is a fork of the AuthContext to add token support and use a reducer instead of useState
// One issue still without resolution is how to cleanly handle API requests including
// loading the intial user data after the token has been set.

// https://codesandbox.io/s/blissful-smoke-ybke8
// https://auth0.com/blog/handling-authentication-in-react-with-context-and-hooks/
// https://github.com/the-road-to-learn-react/use-data-api/blob/master/src/index.js
// https://reactjs.org/docs/hooks-reference.html#usecontext
// Firebase useAuth: https://gist.github.com/timc1/d559d0f8769b4badc0bfc22484fe97a3
// add an axios provider later on: https://gist.github.com/GaZaTu/d26606ef22eeffe8e506fafce7ab10ad
// user provider using memos: https://gist.github.com/3nvi/29999e195a64f557737a9176805d19d6
// Should add "role" checking: https://gist.github.com/Xeoncross/1a5c662ae6a50e9b87d81c05edada46e#file-authprovider-tsx-L43

// We create a context and set the AuthContext.Provider at the root of the app
// sharing a useState() value with all child components. Any component can call
// login/logout to change the useState value causing the provider to notify all
// child components of the update.

interface ContextInterface {
  user: any
  setUser: Function
}

const UserContext = React.createContext<ContextInterface>({user: undefined, setUser: () => {}});

const UserConsumer = UserContext.Consumer;

interface providerprops {
  children?: React.ReactElement
  value?: ContextInterface
}

// props.user could be set in localStorage or pulled from an API call
const UserProvider = (props: providerprops) => {
  // const [user, setUser] = useState(false)
  const [user, setUser] = useLocalStorage("user_account", null);

  // useEffect(() => {
  //   console.log('user', user)
  // }, [user])

  console.log("UserProvider", user ? user.by : undefined);

  // Make sure to not force a re-render on the components that are reading these values,
  // unless the `User` value has changed. This is an optimisation that is mostly needed in cases
  // where the parent of the current component re-renders and thus the current component is forced
  // to re-render as well. If it does, we want to make sure to give the `UserContext.Provider` the
  // same value as long as the User data is the same. If you have multiple other "controller"
  // components or Providers above this component, then this will be a performance booster.
  const values: ContextInterface = React.useMemo(() => ({ user, setUser }), [user, setUser]);
  // const values = { user, setUser }

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

// useUser helper wrapper around UserContext.Consumer
const useUser = (): ContextInterface => {
  const context: ContextInterface = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within an UserProvider");
  }

  // if (context.setUser === undefined) {
  //   throw new Error('setUser is not defined');
  // }

  return context;
};

export { UserProvider, UserConsumer, useUser };
