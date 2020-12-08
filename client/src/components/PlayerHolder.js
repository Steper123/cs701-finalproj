//styling and react components
import React from "react";
import { Row, Col } from "reactstrap";

//css
import classes from "./PlayerHolder.module.css";

const PlayerHolder = ({ player, teamLocation, teamName }) => {
  return (
    <div className={classes.PlayerHolder}>
      <Col>
        <Row>
          <strong>Name: {player.name}   Pos: {player.position}</strong>
        </Row>
        <Row>
          <strong>Team: {teamLocation} {teamName}</strong>
        </Row>
        <Row>
          <Col>
            <small>Height: {player.height}  Weight: {player.weight}</small>
          </Col>
        </Row>
      </Col>
    </div>
  );


}

export default PlayerHolder;
