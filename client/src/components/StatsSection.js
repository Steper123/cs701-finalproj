//styling and react components
import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "reactstrap";

//components called from this base section
import HitterStatDisplay from "./HitterStatDisplay";
import PitcherStatDisplay from "./PitcherStatDisplay";

//css
import classes from "./StatHolders.module.css";

//divides the roster into hitters and pitchers to make it easier to understand the stats
const StatsSection = ({ team, back }) => {
  const [hitters, setHitters] = React.useState([]);
  const [pitchers, setPitchers] = React.useState([]);

//gets the roster using the team.id
  useEffect(() => {
    fetch(`api/players/${team.id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((fetchedPlayers) => {
        const mypitch = [];
        const myhit = [];
        fetchedPlayers.forEach(person => {
          if (person.position === 1) {
            mypitch.push(person);
          }
          else {
            myhit.push(person)
          }
        });
        setHitters(myhit);
        setPitchers(mypitch);
      }).catch(err => {
        console.error(err);
      });
    }, []);

    const backgroundLogo = (
      <div>
        <img src={require(`../assets/images/${team.name.toLowerCase()}_player.png`)} alt="MyLogo" class="center" />
      </div>
    );

    const hitterMapping = hitters.map(hitter => <HitterStatDisplay hitter={hitter}></HitterStatDisplay>);
    const pitcherMapping = pitchers.map(pitcher => <PitcherStatDisplay pitcher={pitcher}></PitcherStatDisplay>);

    return (
      <div>
        <Row>
          <strong className={classes.Titles}>{team.name}' Stats</strong>
        </Row>
        <Row>
          <Col>
            <strong className={classes.Titles}>Pitching</strong>
            <div>
              {pitcherMapping}
            </div>
          </Col>
          <Col>
            <strong className={classes.Titles}>Hitting</strong>
            <div>
              {hitterMapping}
            </div>
          </Col>
        </Row>
        <Button onClick={() => back()}>Back</Button>
        <Row>
          {backgroundLogo}
        </Row>
      </div>
    );

}

export default StatsSection;
