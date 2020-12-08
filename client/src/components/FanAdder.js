//styling and react components
import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "reactstrap";

//css
import classes from "./FanAdder.module.css";

const FanAdder = ({ teamId, addFunc }) => {
  const [users, setUsers] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(-1);
  const [type, setType] = React.useState(1);
  const [date, setDate] = React.useState("");

//brings in all the users, given it is already sorted by fans of the team
  useEffect(() => {
      const fetchUsers = () => {
        fetch("/api/users")
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          })
          .then((fetchedUsers) => {
            setUsers(fetchedUsers);
          }).catch((err) => console.error(err)); // eslint-disable-line no-console
      };
      fetchUsers();

    }, []);

  const userGrabber = (id) => {
    const returnIt = users.filter(user => user.id === selectedId);
    return returnIt[0];
  }

  const constructNewAccess = () => ({
    userId: selectedId,
    teamId: teamId,
    type: type,
    endDate: date
  });

  const userMapping = users.map(user => <option key={user.id} value={user.id}>{user.username}</option>);

  return (
    <div className={classes.FanAdder}>
      <Container>
        <Row>
          <Col>
            <label>Select from our User Database! (If the person you want is not here, have them make an account):</label>
          </Col>
          <Col>
            <select value={selectedId} onChange={(event) => setSelectedId(parseInt(event.target.value,10))}>
            {userMapping}
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Access Level:</label>
          </Col>
          <Col>
            <select value={type} onChange={(event) => setType(parseInt(event.target.value,10))}>
              <option key="Fan" value={3}>Fan</option>
              <option key="Scorer" value={2}>Scorer</option>
              <option key="Coach" value={1}>Coach/Admin</option>
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <label>Set Expiration Date (mm/dd/yyyy):</label>
          </Col>
          <Col>
            <input value={date} onChange={event => setDate(event.target.value)}></input>
          </Col>
        </Row>
        <Row>
          <Button onClick={() => addFunc(constructNewAccess(), userGrabber(selectedId))}>Add Fan</Button>
        </Row>
      </Container>
    </div>

  );


}

export default FanAdder;
