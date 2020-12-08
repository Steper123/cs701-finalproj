//styling and react components
import React from "react";
import { Row, Col } from "reactstrap";

//css
import classes from "./FanHolder.module.css";

const FanHolder = ({ person }) => {
  return (
    <div className={classes.FanHolder}>
      <Col>
        <Row>
          <strong>Name: {person.username}</strong>
        </Row>
      </Col>
    </div>
  );


}

export default FanHolder;
