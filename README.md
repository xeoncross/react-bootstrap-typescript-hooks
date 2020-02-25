## Bootstrap + React in Typescript

Example of a real interface using react (hooks) with a responsive navbar.

## TODO

- https://github.com/tj/react-click-outside/
- pick the correct screen size instead of "500"

Applications generally have three separate "auth-y" needs:

- user data
- user session
- user requests

This application shows a flexable user authentication system that works for OAuth as well as plain user/password logins. The idea is that on login (or successful OAuth completion) you pass 1) a token to the client it will use for all requests (saved in localStorage) and 2) a httpOnly cookie with a session token. TLS/HTTPS is expected.

This token + cookie combo is used to protect against CSRF and XSS by requiring both things to prove a request is valid. The token can be a hash of the cookie value because even if someone got the token they can't figure out what the cookie value is.

You could involve JWT as well, but without any gain. (All endpoints/backends have access to the redis/memcached/etcd session store right?)

### Login flow

1. AuthProvider looks up token in `useLocalStorage()`
   1.2 token found, continue
   1.1 No existing VALID token found in localStorage
   1.1.1 User completes OAuth or HTTP Post of username/password.
   1.2.1 Server returns httpOnly cookie + token over HTTPS
   1.3.1 Set AuthProvider.token (and save to localStorage)
2. token provided to RequestProvider so it can set it in the Authorization header.
3. Request /me endpoint returns user object
   3.1 on failure, erase localStorage token
4. UserProvider.setUser()
   4.1 components now have access to user data and all requests can use the token.

### Logout flow

1. setAuth(false) removes token, updates useLocalStorage()
2. causes new RequestProvider (and UserProvider) to be created _empty_

```jsx
<AuthProvider has="useLocalStorage() for token get/set">
  <RequestProvider for="making all API requests using token">
    <UserProvider for="fetching details about the user for displaying in UI">
      <AppPageHere />
    </UserProvider>
  </RequestProvider>
</AuthProvider>
```

## Questions and Thoughts

What about role checking? Does `isAuthorized()` belong in AuthProvider or UserProvider?

Create the RequestProvider: https://gist.github.com/Xeoncross/1a5c662ae6a50e9b87d81c05edada46e

Create wrappers for:

- Firebase: https://gist.github.com/Xeoncross/4a9741baab7de599977678990d15e91a
- OAuth (window.open)
- email/username + password login forms

### Combined Provider

What about combining all the token, auth, and user into a single auth provider and simply using redux to change state correctly?

```js
const { user, token, isAuthorized, setUser, setToken, axios } = useAuth();
```

Seems to remove flexibilty due to needing to hardwire how to fetch user details when the token is set.

## Resources

- https://github.com/ReactTraining/hooks-workshop
- https://www.youtube.com/watch?v=1jWS7cCuUXw
