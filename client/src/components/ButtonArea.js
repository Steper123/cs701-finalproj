//styling and react components
import React from "react";

//css
import classes from "./ButtonArea.module.css";


const ButtonArea = ({ access, team, returnHome, setTeamState }) => {
  //list of buttons with callbacks to AddDeletePerson to be handled in the parent component
  const addPlayers = (
    <button
      onClick={() => setTeamState("Players")}>Add Players
    </button>
  );
  const addFans = (
    <button
      onClick={() => setTeamState("Fans")}>Add Fans
    </button>
  );
  const goHome = (
    <button
      onClick={() => returnHome()}>Go Home
    </button>
  );
  const startGame = (
    <button className={classes.buttonStyle}
      onClick={() => setTeamState("Game")}>Start/Continue Game
    </button>
  );
  const seeStatsTeam = (
    <button className={classes.buttonStyle}
      onClick={() => setTeamState("Stat")}>See Stats
    </button>
  );
  //const seeStatsDivision = () => {};
  if (access.type === 1) {
    return (<div className={classes.ButtonArea}>
      {addPlayers} {addFans} {seeStatsTeam} {startGame} {goHome}
    </div>);

  }
  else if (access.type === 2) {
    return (
      <div className={classes.ButtonArea}>
        {seeStatsTeam} {goHome}
      </div>
    );

  }
  else {
    return (
      <div className={classes.ButtonArea}>
        {seeStatsTeam} {goHome}
      </div>
    );

  }




}

export default ButtonArea;
