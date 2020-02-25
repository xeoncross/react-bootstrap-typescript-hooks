## Bootstrap + React in Typescript

Example of a real interface using react (hooks) for authentication / user state inside a bootstrap theeme with a responsive navbar. This serves as a 

## Auth / State Overview

Applications generally have three separate "auth-y" needs:

- user data
- user session
- user requests

This application shows a flexable user authentication system that works for OAuth as well as plain user/password logins. 

The idea is that on login (or successful OAuth completion) you pass 1) a token to the backend that will return a user object for the frontend. In addition, the request library (axios?) will probably need to send the token with each request (i.e. `Authorization: Bearer ___`).

If using regular username/password login then you can skip the TokenProvider.

Also make sure to have a CSRF protection setup which often involes a nonce value stored in a cookie that is sent back to the server as a request param or header.

Please look at https://github.com/Xeoncross/react-auth-providers for actual OAuth 2 implementations using hooks. Beside that are Firebase, Auth0, and site-specific SDK login libraries:

- https://github.com/anthonyjgrove/react-google-login
- https://github.com/keppelen/react-facebook-login

### Login flow

1. TokenProvider looks up token in `useLocalStorage()`
   - token found, continue
   - No existing VALID token found in localStorage
      - User completes OAuth (or HTTP Post of username/password)
      - Set TokenProvider token (and save to localStorage)
   - Server returns httpOnly session cookie + CSRF token over HTTPS
2. token provided to RequestProvider so it can set it in the Authorization header.
3. Request /me endpoint returns user object
   3.1 on failure, erase localStorage token
4. UserProvider.setUser()
   4.1 components now have access to user data and all requests can use the token.

## Bootstrap

Most websites use a responsive nav bar for mobile browsing. This theme uses the examples at https://getbootstrap.com/docs/4.4/examples/ as the starting point for a responsive base template.

