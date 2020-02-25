import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

// https://github.com/react-bootstrap/react-bootstrap/issues/3944

interface linkprops {
  to: string;
  children: React.ReactNode;
}

export default (props: linkprops): React.ReactElement => {
  return (
    <Nav.Link as={Link} to={props.to}>
      {props.children}
    </Nav.Link>
  );
};
