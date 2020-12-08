//styling and react components
import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";

//css
import classes from "./TeamAccessHolder.module.css";

//holds all of the access values
const TeamAccessHolder = ({ teamaccess, dataReturn }) => {
  const [team, setTeam] = React.useState(null);

  //gets team information using the data in the teamaccess object
  useEffect(() => {
      const fetchTeam = () => {
        fetch("/api/teams")
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          })
          .then((fetchedTeams) => {
            const checkedTeam = fetchedTeams.filter(team => team.id === teamaccess.teamId);
            if (checkedTeam.length !==  0) {
              setTeam(checkedTeam[0]);
            }
          })
          .catch((err) => console.error(err)); // eslint-disable-line no-console
      };

      fetchTeam();

    }, []);

  const typeChecker = (num) => {
    if (num === 3) {
      return "Fan";
    }
    else if (num === 2) {
      return "Scorer";
    }
    else if (num === 1) {
      return "Admin/Coach"
    }
  }
  if (team !==  null) {
    return (
      <div className={classes.TeamAccessHolder}>
        <Row>
          <strong>Team Mascot: {team.name} ({typeChecker(teamaccess.type)})</strong>
        </Row>
        <Row>
          <strong>Team Location: {team.location}</strong>
        </Row>
        <Row>
          <small>Coach: {team.coach}          Division: {team.division}</small>
        </Row>
        <Row>
          <button onClick={() => dataReturn(team, teamaccess)}>Select</button>
        </Row>
      </div>
    );
  }
  return (
    <div>Loading...</div>
  );

}

export default TeamAccessHolder;
