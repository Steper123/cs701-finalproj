//styling and react components
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import GameDisplay from "./GameDisplay";

//css
import classes from "./EventHolder.module.css";

//component that sets the possible selections for position
const PositionSelect = ({ current, setter }) => {
  const labels = ["P", "C", "1B", "2B", "SS", "3B", "LF", "CF", "RF", "DH"];
  const optionMapping = labels.map((label, index) =>
    <option key={label} value={index+1}>{label}</option>
  );
  return (
    <select value={current} onChange={(event) => setter(parseInt(event.target.value,10))}>
      {optionMapping}
    </select>
  );
}

//component that lays out the lineup options for a given team
const LineupSelection = ({ teamId, accept }) => {
  const [hitters, setHitters] = React.useState([]);
  const [pitchers, setPitchers] = React.useState([]);
  const [firstPlayer, setFirstPlayer] = React.useState(-1);
  const [firstPos, setFirstPos] = React.useState(-1);
  const [secondPlayer, setSecondPlayer] = React.useState(-1);
  const [secondPos, setSecondPos] = React.useState(-1);
  const [thirdPlayer, setThirdPlayer] = React.useState(-1);
  const [thirdPos, setThirdPos] = React.useState(-1);
  const [fourthPlayer, setFourthPlayer] = React.useState(-1);
  const [fourthPos, setFourthPos] = React.useState(-1);
  const [fifthPlayer, setFifthPlayer] = React.useState(-1);
  const [fifthPos, setFifthPos] = React.useState(-1);
  const [sixthPlayer, setSixthPlayer] = React.useState(-1);
  const [sixthPos, setSixthPos] = React.useState(-1);
  const [seventhPos, setSeventhPos] = React.useState(-1);
  const [seventhPlayer, setSeventhPlayer] = React.useState(-1);
  const [eighthPos, setEighthPos] = React.useState(-1);
  const [eighthPlayer, setEighthPlayer] = React.useState(-1);
  const [ninthPlayer, setNinthPlayer] = React.useState(-1);
  const [ninthPos, setNinthPos] = React.useState(-1);
  const [startP, setStartP] = React.useState(-1);

  //gets the roster of the team, breaking it up into hitters and pitchers
  useEffect(() => {
      const fetchRoster = () => {
        if (teamId !== -1) {
          fetch(`api/players/${teamId}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          })
          .then((fetchedPlayers) => {
            const gottenHitters = fetchedPlayers.filter(player => player.position !== 1);
            const gottenPitchers = fetchedPlayers.filter(player => player.position === 1);
            setHitters(gottenHitters);
            setPitchers(gottenPitchers);
          }).catch(err => {
            console.error(err);
          });
        }

      }

      fetchRoster();

    }, [teamId]);

/*next two functions examine technicalities within a lineup and assure they are met*/
    const samePlayer = () => {
      const alreadySeen = [firstPlayer, secondPlayer, thirdPlayer, fourthPlayer, fifthPlayer, sixthPlayer, seventhPlayer, eighthPlayer, ninthPlayer];
      const passed = [];
      let uhoh = 0;
      alreadySeen.forEach(person => {
        if (passed.includes(person)) {
          uhoh = uhoh + 1;
        }
        else {
          passed.push(person);
        }
      });

      if (uhoh > 0) {
        return false;
      }
      else {
        return true;
      }

    }

    const samePosition = () => {
      const alreadySeen = [firstPos, secondPos, thirdPos, fourthPos, fifthPos, sixthPos, seventhPos, eighthPos, ninthPos];
      const passed = [];
      let uhoh = 0;
      alreadySeen.forEach(position => {
        if (passed.includes(position)) {
          uhoh = uhoh + 1;
        }
        else {
          passed.push(position);
        }
      });
      if (uhoh > 0) {
        return false;
      }
      else {
        return true;
      }
    }

    const findPitcher = () => {
      if (firstPos === 1) {
        return firstPlayer;
      }
      else if (secondPos === 1) {
        return secondPlayer;
      }
      else if (thirdPos === 1) {
        return thirdPlayer;
      }
      else if (fourthPos === 1) {
        return fourthPlayer;
      }
      else if (fifthPos === 1) {
        return fifthPlayer;
      }
      else if (sixthPos === 1) {
        return sixthPlayer;
      }
      else if (seventhPos === 1) {
        return seventhPlayer;
      }
      else if (eighthPos === 1) {
        return eighthPlayer;
      }
      else {
        return ninthPlayer;
      }
    }

    //contains checks to the new lineup to assure requirements are met
    const returnNewLineup = () => {
      if (firstPlayer === -1 || firstPos === -1 || secondPlayer === -1 || secondPos === -1 || thirdPlayer === -1 || thirdPos === -1 || fourthPlayer === -1 || fourthPos === -1 || fifthPlayer === -1 || fifthPos === -1 || sixthPlayer === -1 || sixthPos === -1 || seventhPlayer === -1 || seventhPos === -1 || eighthPlayer === -1 || eighthPos === -1 || ninthPlayer === -1 || ninthPos === -1) {
        return "error";
      }
      else if (!samePlayer() || !samePosition()){
        return "error";
      }
      else {
        if (startP === -1) {
          return ({
            teamId: teamId,
            gameId: 0,
            firstId: firstPlayer,
            firstPos: firstPos,
            secondId: secondPlayer,
            secondPos: secondPos,
            thirdId: thirdPlayer,
            thirdPos: thirdPos,
            fourthId: fourthPlayer,
            fourthPos: fourthPos,
            fifthId: fifthPlayer,
            fifthPos: fifthPos,
            sixthId: sixthPlayer,
            sixthPos: sixthPos,
            seventhId: seventhPlayer,
            seventhPos: seventhPos,
            eighthId: eighthPlayer,
            eighthPos: eighthPos,
            ninthId: ninthPlayer,
            ninthPos: ninthPos,
            pitcher: findPitcher()
          });

        }
        return ({
          teamId: teamId,
          gameId: 0,
          firstId: firstPlayer,
          firstPos: firstPos,
          secondId: secondPlayer,
          secondPos: secondPos,
          thirdId: thirdPlayer,
          thirdPos: thirdPos,
          fourthId: fourthPlayer,
          fourthPos: fourthPos,
          fifthId: fifthPlayer,
          fifthPos: fifthPos,
          sixthId: sixthPlayer,
          sixthPos: sixthPos,
          seventhId: seventhPlayer,
          seventhPos: seventhPos,
          eighthId: eighthPlayer,
          eighthPos: eighthPos,
          ninthId: ninthPlayer,
          ninthPos: ninthPos,
          pitcher: startP
        });
      }
    };

    const hitterSelect = hitters.map(person => <option key={person.id} value={person.id}>{person.name}</option>);
    const pitcherSelect = pitchers.map(person => <option key={person.id} value={person.id}>{person.name}</option>);
    pitcherSelect.push(<option key={-1} value={-1}>ALREADY IN</option>);
    hitterSelect.push(<option key={-1} value={-1}>NOT SELECTED</option>);



    if (teamId === -1) {
      return (<div></div>);
    }
    return(
      <div>
        <div className={classes.LineupConstraint}>
          <strong className={classes.HitterTitle}>First Hitter: </strong>
          <select value={firstPlayer} onChange={(event) => setFirstPlayer(parseInt(event.target.value,10))}>
            {hitterSelect}
          </select>
          <PositionSelect current={firstPos} setter={setFirstPos}></PositionSelect>
        </div>
        <div className={classes.LineupConstraint}>
          <strong className={classes.HitterTitle}>Second Hitter: </strong>
          <select value={secondPlayer} onChange={(event) => setSecondPlayer(parseInt(event.target.value,10))}>
            {hitterSelect}
          </select>
          <PositionSelect current={secondPos} setter={setSecondPos}></PositionSelect>
        </div>
        <div className={classes.LineupConstraint}>
          <strong className={classes.HitterTitle}>Third Hitter: </strong>
          <select value={thirdPlayer} onChange={(event) => setThirdPlayer(parseInt(event.target.value,10))}>
            {hitterSelect}
          </select>
          <PositionSelect current={thirdPos} setter={setThirdPos}></PositionSelect>
        </div>
        <div className={classes.LineupConstraint}>
          <strong className={classes.HitterTitle}>Fourth Hitter: </strong>
          <select value={fourthPlayer} onChange={(event) => setFourthPlayer(parseInt(event.target.value,10))}>
            {hitterSelect}
          </select>
          <PositionSelect current={fourthPos} setter={setFourthPos}></PositionSelect>
        </div>
        <div className={classes.LineupConstraint}>
          <strong className={classes.HitterTitle}>Fifth Hitter: </strong>
          <select value={fifthPlayer} onChange={(event) => setFifthPlayer(parseInt(event.target.value,10))}>
            {hitterSelect}
          </select>
          <PositionSelect current={fifthPos} setter={setFifthPos}></PositionSelect>
        </div>
        <div className={classes.LineupConstraint}>
          <strong className={classes.HitterTitle}>Sixth Hitter: </strong>
          <select value={sixthPlayer} onChange={(event) => setSixthPlayer(parseInt(event.target.value,10))}>
            {hitterSelect}
          </select>
          <PositionSelect current={sixthPos} setter={setSixthPos}></PositionSelect>
        </div>
        <div className={classes.LineupConstraint}>
          <strong className={classes.HitterTitle}>Seventh Hitter: </strong>
          <select value={seventhPlayer} onChange={(event) => setSeventhPlayer(parseInt(event.target.value,10))}>
            {hitterSelect}
          </select>
          <PositionSelect current={seventhPos} setter={setSeventhPos}></PositionSelect>
        </div>
        <div className={classes.LineupConstraint}>
          <strong className={classes.HitterTitle}>Eighth Hitter: </strong>
          <select value={eighthPlayer} onChange={(event) => setEighthPlayer(parseInt(event.target.value,10))}>
            {hitterSelect}
          </select>
          <PositionSelect current={eighthPos} setter={setEighthPos}></PositionSelect>
        </div>
        <div className={classes.LineupConstraint}>
          <strong className={classes.HitterTitle}>Ninth Hitter: </strong>
          <select value={ninthPlayer} onChange={(event) => setNinthPlayer(parseInt(event.target.value,10))}>
            {hitterSelect}
          </select>
          <PositionSelect current={ninthPos} setter={setNinthPos}></PositionSelect>
        </div>
        <div className={classes.LineupConstraint}>
          <strong className={classes.HitterTitle}>Starting Pitcher: </strong>
          <select value={startP} onChange={(event) => setStartP(parseInt(event.target.value,10))}>
            {pitcherSelect}
          </select>
        </div>
        <Button onClick={() => accept(returnNewLineup(), teamId)}>Lock Lineup</Button>
      </div>
    );


};

//the main control center that eventually will create the game necessary to play
const EventHolder = ({ team, back, userId }) => {
  //hooks
  const [eventMode, setEventMode] = React.useState("Home");
  const [hora, setHora] = React.useState("Away");
  const [posTeams, setPosTeams] = React.useState([]);
  const [opponent, setOpponent] = React.useState(-1);
  const [myLineObj, setMyLineObj] = React.useState(null);
  const [oppLineObj, setOppLineObj] = React.useState(null);
  const [gameId, setGameId] = React.useState(-1);

  //going back to this page from the game
  const handleBack = () => {
    setEventMode("Home");
    setOpponent(-1);
    setMyLineObj(null);
    setOppLineObj(null);
    setGameId(-1);
    back();
  }

  function HomeAway(des, loc, myTeam, oppTeam) {
    if (des === "A") {
      if (loc === "Away") {
        return myTeam;
      }
      else {
        return oppTeam;
      }
    }
    else {
      if (loc === "Away") {
        return oppTeam;
      }
      else {
        return myTeam;
      }
    }

  }

//checks games that currently exist and whether the use would want to continue them
  useEffect(() => {
    const checkGames = () => {
      fetch("/api/games")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      }).then((fetchedGames) => {
        const gameExamine = fetchedGames.filter(game => game.complete === 0 && game.scorerId === userId);
        if (gameExamine.length > 1) {
          setGameId(gameExamine[0].id);
          setEventMode("Game");
        }
      })
    }
    const fetchTeams = () => {
      fetch("/api/teams")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        }).then((fetchedTeams) => {
          // Create a copy of the collections, replacing the current article if this is an edit
          setPosTeams(fetchedTeams);
        })
    }
  checkGames();
  fetchTeams();
//add back CurrUser
}, []);

  //Function that posts the game and the two saved lineups
  const gameTime = () => {
    const myGame = ({
      homeId: HomeAway("H", hora, team.id, opponent),
      awayId: HomeAway("A", hora, team.id, opponent),
      scorerId: userId,
      complete: 0
    });

    const gameObj = fetch("/api/games", {
      method: "POST",
      body: JSON.stringify(myGame),
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
      .then((returnedGame) => {
        setGameId(returnedGame.id);
        return returnedGame;
      }).catch(err => {
        console.error(err);
      });

      gameObj.then(passedgame => {
        const myLineUp = {...myLineObj, gameId: passedgame.id};

        fetch("/api/lineups", {
          method: "POST",
          body: JSON.stringify(myLineUp),
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
          .then((emptyReturn) => {
            const oppLineUp = {...oppLineObj, gameId: passedgame.id};
            fetch("/api/lineups", {
              method: "POST",
              body: JSON.stringify(oppLineUp),
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
          }).catch(err => {
            console.error(err);
          });
      })

      setEventMode("Game");
  }

  const acceptLineup = (lineupObj, id) => {
    if (lineupObj !== "error") {
      if (id === team.id) {
        setMyLineObj(lineupObj);
      }
      else {
        setOppLineObj(lineupObj);
      }
    }
  };

  const teamSelect = posTeams.map(team => <option key={team.id} value={team.id}>{team.name}</option>);

  const backgroundLogo = (
    <div>
      <img src={require(`../assets/images/check.png`)} alt="MyLogo" class="center" />
    </div>
  );

  const backButton = (
    <button onClick={()=>back()}>Back</button>
  );

  if (eventMode === "Home") {
    return (
      <div>
        <h1 className={classes.Title}>WELCOME TO THE GAME CREATOR.</h1>
        <strong className={classes.Subtitle}>Please examine the options below before continuing</strong>
        <div className={classes.TopContainer}>
          <strong>{team.name}</strong>
          <select value={hora} onChange={event => setHora(event.target.value)}>
            <option key="Home" value={"Home"}>Home Left</option>
            <option key="Away" value={"Away"}>Home Right</option>
          </select>
          <select value={opponent} onChange={(event) => setOpponent(parseInt(event.target.value,10))}>
            {teamSelect}
          </select>
        </div>
        <div>
        <div className={classes.MyTeamContainer}>
          <LineupSelection teamId={team.id} accept={acceptLineup}></LineupSelection>
          {myLineObj && backgroundLogo}
        </div>
        <div className={classes.OtherTeamContainer}>
          <LineupSelection teamId={opponent} accept={acceptLineup}></LineupSelection>
          {oppLineObj && backgroundLogo}
        </div>
        </div>
        <div>
          {myLineObj && oppLineObj && <Button onClick={() => gameTime()}>Start Game!</Button>}
          {backButton}
        </div>
      </div>
    );
  }
  else {
    if (gameId === -1) {
      return (<div>Loading...</div>);
    }
    return (
      <div>
        <GameDisplay gameId={gameId} back={handleBack}></GameDisplay>
      </div>
    );

  }

}

export default EventHolder;
