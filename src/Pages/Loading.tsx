import React from "react";
import { Spinner, Row, Col } from "react-bootstrap";

const LoadingPage: React.FC = () => {
  return (
    <Row className="justify-content-md-center">
      <Col md="auto">
        <br />
        <br />
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Col>
    </Row>
  );
};

export default LoadingPage;
