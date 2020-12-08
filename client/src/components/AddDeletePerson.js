//styling and react components
import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";

//components that will be called
import PlayerHolder from "./PlayerHolder";
import FanHolder from "./FanHolder";
import PlayerAdder from "./PlayerAdder";
import FanAdder from "./FanAdder";

const AddDeletePerson = ({ team, type, back, returnHome }) => {
  const [list, setList] = React.useState([]);

  /*checks if the call was asking for players, scorers, or fans, returning the list of those individuals*/
  useEffect(() => {
    const buildList = () => {
      if (type === "Players") {
        fetch("/api/players")
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          })
          .then((fetchedPlayers) => {
            const actualList = fetchedPlayers.filter(player => player.teamId === team.id);
            setList(actualList);
          }).catch((err) => console.error(err)); // eslint-disable-line no-console
      }
      else if (type === "Scorers") {
        const allAccess = fetch(`/api/teamaccess`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          }).then((info) => {
              const returnedInfo = info.filter(access => access.teamId === team.id && access.type === 2);
              return returnedInfo;

            }
          ).catch(error => {
            console.log(error);
          });

          allAccess.then(data => {
            fetch(`/api/users`)
              .then(response => {
                if (!response.ok) {
                  throw new Error(response.status_text);
                }
                return response.json();
              })
              .then(data => {
                const trueList = data.filter(user => allAccess.includes(user.id));
                setList(trueList);
              })
              .catch(error => {
                console.log(error);
              });


          })
      }

      else if (type === "Fans") {
        const allAccess = fetch(`/api/teamaccess`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          }).then((info) => {
              const returnedInfo = info.filter(access => access.teamId === team.id);
              const myIds = returnedInfo.map(point => point.userId);
              return myIds;
            }
          ).catch(error => {
            console.log(error);
          });

          allAccess.then(data => {
            fetch(`/api/users`)
              .then(response => {
                if (!response.ok) {
                  throw new Error(response.status_text);
                }
                return response.json();
              })
              .then(returnedVal => {
                const trueList = returnedVal.filter(user => data.includes(user.id));
                setList(trueList);
              })
              .catch(error => {
                console.log(error);
              });


          })
      }
    }
    buildList();
    }, []);

    const backgroundLogo = (
      <div>
        <img src={require(`../assets/images/${team.name.toLowerCase()}_player.png`)} alt="MyLogo" class="center" />
      </div>
    );

    const handleDeletePlayer = (player) => {
      //handles the callback used when getting rid of a player
      fetch(`/api/players/${player.id}`, {
        method: "DELETE"
      })
        .then(response => {
          if (response.ok) {
            const newList = list.filter(playerExist => playerExist.id !== player.id);
            setList(newList);
          }
        })
        .catch(err => console.error(err));
    };

    const handleDeleteAccess = (fan) => {
      //handles the callback of when a fan is deleted from a list
      const thisAccess = fetch(`/api/teamaccess/`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        }).then((info) => {
            const returnedInfo = info.filter(access => access.teamId === team.id && access.userId === fan.id);
            return returnedInfo[0];
          }
        ).catch(error => {
          console.log(error);
        });

      thisAccess.then((access) => {
        fetch(`/api/teamaccess/${access.id}`, {
          method: "DELETE"
        })
          .then(response => {
            if (response.ok) {
              const newList = list.filter(personExist => personExist.id !== fan.id);
              setList(newList);
            }
          })
          .catch(err => console.error(err));
      })
    };

    const handleAddPlayer = (player) => {
      //handles the callback of trying to add a person to the team roster
        fetch("/api/players", {
          method: "POST",
          body: JSON.stringify(player),
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json"
          })
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          })
          //Add the newly created order to local orders and update order state
          .then(receivedPerson => {
            const newList = [...list, receivedPerson];
            setList(newList);
            back();
          })
          .catch(err => {
            console.error(err);
          });
    }

    const handleAddUser = (accessSelected, actualUser) => {
      //handles the callback of including a user in the database with a new teamaccess
      fetch("/api/teamaccess", {
        method: "POST",
        body: JSON.stringify(accessSelected),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json"
        })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then(receivedAccess => {
          const newList = [...list, actualUser];
          setList(newList);
          back();
        })
        .catch(err => {
          console.error(err);
        });
    }

    const backButton = (
      <Button onClick={() => back()}>Back</Button>
    );


    if (list != null && type === "Players") {
      const trueMapping = list.map(person => (
        <Row>
          <PlayerHolder player={person} teamLoc={team.location} teamName={team.name}></PlayerHolder>
          <button onClick={() => handleDeletePlayer(person)}>Delete Player</button>
        </Row>
      )
    );
      return (
        <div>
          <Row>
            <Col>
              <div> {trueMapping} </div>
            </Col>
            <Col>
              <PlayerAdder teamId={team.id} addFunc={handleAddPlayer}></PlayerAdder>
            </Col>
          </Row>
          <Row>
            {backButton}
          </Row>
          <Row>
            {backgroundLogo}
          </Row>
        </div>
      );

    }
    else if (list != null) {
      const trueMapping = list.map(person => (
        <Row>
          <FanHolder person={person}></FanHolder>
          <Button onClick={() => handleDeleteAccess(person)}>Delete</Button>
        </Row>
      ));
      return (
        <div>
          <Row>
            <Col>
              <ul> {trueMapping} </ul>
              <strong>{trueMapping.length}</strong>
            </Col>
            <Col>
              <FanAdder teamId={team.id} addFunc={handleAddUser}></FanAdder>
            </Col>
          </Row>
          <Row>
            {backButton}
          </Row>
          <Row>
            {backgroundLogo}
          </Row>
        </div>
      );
    }
    else {
      return (<div>Loading...</div>);
    }

}

export default AddDeletePerson;
