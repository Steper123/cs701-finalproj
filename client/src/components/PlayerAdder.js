//styling and react components
import React from "react";
import { Container, Button, Row, Col } from "reactstrap";

//css
import classes from "./PlayerAdder.module.css";

//includes the ability to add a given player to a team roster
const PlayerAdder = ({ teamId, addFunc }) => {
  const [first, setFirst] = React.useState("");
  const [last, setLast] = React.useState("");
  const [posnum, setPos] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const constructNewPlayer = () => ({
    teamId: teamId,
    name: first + ' ' + last,
    height: height,
    weight: weight,
    position: posnum
  });

  return (
    <div className={classes.PlayerAdder}>
      <Container>
        <Row>
          <Col>
            <label>Player First Name:</label>
          </Col>
          <Col>
            <input value={first} onChange={event => setFirst(event.target.value)}></input>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Player Last Name:</label>
          </Col>
          <Col>
            <input value={last} onChange={event => setLast(event.target.value)}></input>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Position:</label>
          </Col>
          <Col>
            <select value={posnum} onChange={(event) => setPos(parseInt(event.target.value,10))}>
              <option key="P" value={1}>P</option>
              <option key="C" value={2}>C</option>
              <option key="1B" value={3}>1B</option>
              <option key="2B" value={4}>2B</option>
              <option key="3B" value={5}>3B</option>
              <option key="SS" value={6}>SS</option>
              <option key="LF" value={7}>LF</option>
              <option key="CF" value={8}>CF</option>
              <option key="RF" value={9}>RF</option>
              <option key="DH" value={10}>DH</option>
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Height (in inches):</label>
          </Col>
          <Col>
            <input value={height} onChange={(event) => setHeight(parseInt(event.target.value,10))}></input>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Weight (in pounds):</label>
          </Col>
          <Col>
            <input value={weight} onChange={(event) => setWeight(parseInt(event.target.value,10))}></input>
          </Col>
        </Row>
        <Row>
          <Button onClick={() => addFunc(constructNewPlayer())}>Add Player</Button>
        </Row>
      </Container>
    </div>

  );


}

export default PlayerAdder;
