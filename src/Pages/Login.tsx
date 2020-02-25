import React, { useEffect, useState } from "react";
import { useUser } from "../Components/UserContext";
import { useToken } from "../Components/TokenContext";
import useDataApi from "../Components/useDataAPI";
import { Redirect } from "react-router-dom";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import LoadingPage from "./Loading";

const LoginPage: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useUser();
  const { token, setToken } = useToken();

  const [{ data, isLoading, error }, doFetch] = useDataApi(
    undefined,
    "",
    null,
    null
  );

  useEffect(() => {
    if (token) {
      console.log("doFetch", token);
      doFetch(
        `https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty`
      );
    }
  }, [token, doFetch]);

  useEffect(() => {
    setUser(data);
  }, [data, setUser]);

  console.log("LoginPage", "data", data, "token", token);

  if (loading && !user) {
    return <LoadingPage />;
  }

  if (user) {
    return <Redirect to="/" />;
  }

  if (error) {
    setLoading(false)
  }

  return (
    <Row className="justify-content-md-center">
      <Col md="auto">
        {error ? (
          <div>
            <h1>{error}</h1>
          </div>
        ) : (
          ""
        )}
        <br />
        <br />

        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Please Login</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              onClick={(): void => {
                setLoading(true);

                setTimeout((): void => {
                  // Launch the OAuth window
                  // or submit the user/password form
                  // or trigger firebase (or whatever)
                  // ...and then set the token on success
                  setToken("123");
                  // setLoading(false);
                }, 1000);
              }}
            >
              Login
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Col>
    </Row>
  );
};

export default LoginPage;
