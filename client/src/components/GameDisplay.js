//styling and react components
import React, { useState, useEffect } from "react";

//components that will be called from this base
import LineupPlayer from "./LineupPlayer";
import InningReader from "./InningReader";

//css
import classes from "./GameDisplay.module.css";

//component that holds the display for the team's lineups
const LineupHolder = ({ game, teamId }) => {
  const [lineup, setLineup] = React.useState(null);
  const [bench, setBench] = React.useState(null);
  const [bullpen, setBullpen] = React.useState(null);

  function checkIn(playerId, lineup) {
    if (lineup.firstId === playerId || lineup.secondId === playerId || lineup.thirdId === playerId || lineup.fourthId === playerId || lineup.fifthId === playerId || lineup.sixthId === playerId || lineup.seventhId === playerId || lineup.eighthId === playerId || lineup.ninthId === playerId || lineup.pitcher === playerId) {
      return true;
    }
    return false;
  }

  function makeArray(lineupObj) {
    return [lineupObj.firstId, lineupObj.secondId, lineupObj.thirdId, lineupObj.fourthId, lineupObj.fifthId, lineupObj.sixthId, lineupObj.seventhId, lineupObj.eighthId, lineupObj.ninthId, lineupObj.pitcher];
  }

  //returns the given lineup by using the team id and splitting the roster into starters, bench, and bullpen
  useEffect(() => {
      const theLineup = fetch(`api/players/${teamId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then((fetchedPlayers) => {
          return fetchedPlayers;
        }).catch(err => {
          console.error(err);
        });

        theLineup.then(data => {
          fetch(`api/lineups/${game.id}`)
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error(response.statusText);
            })
            .then((fetchedLineups) => {
              const trueLineList = fetchedLineups.filter(lineup => teamId === lineup.teamId);
              const trueLine = trueLineList[0];
              const myBullpen = [];
              const myBench = [];
              data.forEach(player => {
                if (player.position !== 1) {
                  if (!checkIn(player.id, trueLine)) {
                    myBench.push(player);
                  }
                }
                else {
                  if (!checkIn(player.id, trueLine)) {
                    myBullpen.push(player);
                  }
                }
              });

              setLineup(trueLine);
              setBench(myBench);
              setBullpen(myBullpen);
            }).catch(err => {
              console.error(err);
            });
        })
    }, []);



    if (lineup === null || bullpen === null || bench === null) {
      return (<div>Loading...</div>);
    }

    const madeList = makeArray(lineup);

    const lineupMap = madeList.map(playerId => <div><LineupPlayer playerId={playerId}></LineupPlayer></div>);
    const bullpenMap = bullpen.map(pitcher => <div><small>{pitcher.name}</small></div>);
    const benchMap = bench.map(hitter => <div><small>{hitter.name}</small></div>);

    return (
      <div className={classes.LineupHolder}>
        <strong className={classes.TeamTitle}>Lineup</strong>
        {lineupMap}
        <div className={classes.SmallSection}>
          <small className={classes.TeamTitle}>Bullpen</small>
          {bullpenMap}
        </div>
        <div className={classes.SmallSection}>
          <small className={classes.TeamTitle}>Bench</small>
          {benchMap}
        </div>
      </div>
    );
}

//component that holds the title of the game and box score component
const GameTitleAndBox = ({ game }) => {
  const [homeTeam, setHome] = React.useState(null);
  const [roadTeam, setRoad] = React.useState(null);
  const [innings, setInnings] = React.useState([]);

  //pulls in the two teams using their ID and gets the innings for the game
  useEffect(() => {
      const setTeams = () => {
        fetch(`api/teams`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          })
          .then((fetchedTeams) => {
            const filteredTeams = fetchedTeams.filter(team => team.id === game.awayId || team.id === game.homeId);
            if (filteredTeams[0].id === game.homeId) {
              setHome(filteredTeams[0]);
              setRoad(filteredTeams[1]);
            }
            else {
              setHome(filteredTeams[1]);
              setRoad(filteredTeams[0]);
            }
          }).catch(err => {
            console.error(err);
          });
      }
      const getdaInnings = () => {
        fetch(`api/innings/${game.id}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          })
          .then((fetchedInnings) => {
            setInnings(fetchedInnings);
          }).catch(err => {
            console.error(err);
          });
      }
      setTeams();
      getdaInnings();
//add back innings
}, [innings]);

  //collects the hits and runs for the innings and adds them up
    const awayOpps = [];
    const homeOpps = [];
    let homeHits = 0;
    let awayHits = 0;
    let homeRuns = 0;
    let awayRuns = 0;
    innings.forEach((inning, index) => {
      if (index % 2 === 0) {
        awayOpps.push(inning.runs);
        awayHits = awayHits + inning.hits;
        awayRuns = awayRuns + inning.runs;
      }
      else {
        homeOpps.push(inning.runs);
        homeHits = homeHits + inning.hits;
        homeRuns = homeRuns + inning.runs;
      }
    });

    let loopCounter = innings.length;
    while (loopCounter !== 18) {
      if (loopCounter %2 === 0) {
        homeOpps.push("-");
      }
      else {
        awayOpps.push("-");
      }

      loopCounter += 1;
    }

    const awayMapping = awayOpps.map(opp =><small className={classes.LineItem}>{opp}</small>);
    const homeMapping = homeOpps.map(opp => <small className={classes.LineItem}>{opp}</small>);

    if (homeTeam === null || roadTeam === null) {
      return (<div>Loading...</div>);
    }

    return (
      <div>
        <h1 className={classes.Title}>{roadTeam.name} at {homeTeam.name}</h1>
        <div className={classes.Line}>
          <small className={classes.LineItem}>Team</small>
          <small className={classes.LineItem}>1</small>
          <small className={classes.LineItem}>2</small>
          <small className={classes.LineItem}>3</small>
          <small className={classes.LineItem}>4</small>
          <small className={classes.LineItem}>5</small>
          <small className={classes.LineItem}>6</small>
          <small className={classes.LineItem}>7</small>
          <small className={classes.LineItem}>8</small>
          <small className={classes.LineItem}>9</small>
          <small className={classes.LineItem}>R</small>
          <small className={classes.LineItem}>H</small>
        </div>
        <div className={classes.Line}>
          <small className={classes.LineItem}>{roadTeam.name}</small>
          {awayMapping}
          <small className={classes.LineItem}>{awayRuns}</small>
          <small className={classes.LineItem}>{awayHits}</small>
        </div>
        <div className={classes.Line}>
          <small className={classes.LineItem}>{homeTeam.name}</small>
          {homeMapping}
          <small className={classes.LineItem}>{homeRuns}</small>
          <small className={classes.LineItem}>{homeHits}</small>
        </div>
      </div>
    );


}

//main component that takes callbacks for running the game
const GameDisplay = ({ gameId, back }) => {
  const [myGame, setGame] = React.useState(null);
  const [currInn, setCurrInn] = React.useState(null);
  const [whoHitting, setHittingId] = React.useState("Away");
  const [awayOrder, setAwayOrder] = React.useState(0);
  const [homeOrder, setHomeOrder] = React.useState(0);

  //grabs the game by the given ID, and sets up current inning with any saved state
  useEffect(() => {
      const setUP = fetch("api/games")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then((fetchedGames) => {
          const filteredGames = fetchedGames.filter(game => game.id === gameId);
          setGame(filteredGames[0]);
          return filteredGames[0];
        }).catch(err => {
          console.error(err);
        });

        setUP.then((data) => {
          fetch(`api/innings/${data.id}`)
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error(response.statusText);
            })
            .then((fetchedInnings) => {
              //posts new inning if no innings existed prior
              if (fetchedInnings.length === 0) {
                const myInning = ({
                  gameId: data.id,
                  pitchingId: data.homeId,
                  hittingId: data.awayId,
                  number: 1,
                  runs: 0,
                  hits: 0,
                  balls: 0,
                  strikes: 0,
                  outs: 0,
                  firstRunnerId: 0,
                  secondRunnerId: 0,
                  thirdRunnerId: 0,
                  ifPaused: 0
                });
                fetch("/api/innings", {
                  method: "POST",
                  body: JSON.stringify(myInning),
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
                  .then((returnedInning) => {
                    setCurrInn(returnedInning);
                    setHittingId("Away");
                  }).catch(err => {
                    console.error(err);
                  });
              }
              else {
                //sets old inning otherwise
                if (fetchedInnings.length % 2 === 0) {
                  setHittingId("Home");
                  setCurrInn(fetchedInnings[fetchedInnings.length - 1]);
                  setHomeOrder(fetchedInnings[fetchedInnings.length - 1].ifPaused);
                }
                else {
                  setHittingId("Away");
                  setCurrInn(fetchedInnings[fetchedInnings.length - 1]);
                  setAwayOrder(fetchedInnings[fetchedInnings.length - 1].ifPaused);
                }
              }
            })

        })

    }, []);

  //function that begins a new inning as necessary
  const startNewInning = (loc) => {
    const findInnings = fetch(`api/innings/${myGame.id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((fetchedInnings) => {
        return fetchedInnings;
      }).catch(err => {
        console.error(err);
      });

      findInnings.then((data) => {
        if (data.length % 2 === 0) {
          const myInning = ({
            gameId: myGame.id,
            pitchingId: myGame.homeId,
            hittingId: myGame.awayId,
            number: data[data.length - 1].number + 1,
            runs: 0,
            hits: 0,
            balls: 0,
            strikes: 0,
            outs: 0,
            firstRunnerId: 0,
            secondRunnerId: 0,
            thirdRunnerId: 0,
            ifPaused: 0
          });
          fetch("/api/innings", {
            method: "POST",
            body: JSON.stringify(myInning),
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
            .then((returnedInning) => {
              setCurrInn(returnedInning);
              if (whoHitting === "Away") {
                setAwayOrder(loc);
              }
              else {
                setHomeOrder(loc);
              }
              setHittingId("Away");
            }).catch(err => {
              console.error(err);
            });

        }
        else {

          const myInning = ({
            gameId: myGame.id,
            pitchingId: myGame.awayId,
            hittingId: myGame.homeId,
            number: data[data.length - 1].number,
            runs: 0,
            hits: 0,
            balls: 0,
            strikes: 0,
            outs: 0,
            firstRunnerId: 0,
            secondRunnerId: 0,
            thirdRunnerId: 0,
            ifPaused: 0
          });
          fetch("/api/innings", {
            method: "POST",
            body: JSON.stringify(myInning),
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
            .then((returnedInning) => {
              setCurrInn(returnedInning);
              if (whoHitting === "Away") {
                setAwayOrder(loc);
              }
              else {
                setHomeOrder(loc);
              }
              setHittingId("Home");
            }).catch(err => {
              console.error(err);
            });
        }
      });
  }

  //handles if the user wants to end the game, returning the person back to the TeamPage and setting complete
  //for the game to 1
  const handleEndGame = () => {
    const finalizingGame = {...myGame, complete: 1};
    fetch(`/api/games/${finalizingGame.id}`, {
      method: "PUT",
      body: JSON.stringify(finalizingGame),
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

      back();

  };

  //ends game without reaching the ninth inning
  const terminateButton = (
    <button onClick={()=>handleEndGame()}>End Early/Terminate Game</button>
  );

  //occurs at the end of a given inning, calling startnewinning once it is updated
  const handleEndInning = (changedInning, atWhere) => {
    fetch(`/api/innings/${changedInning.id}`, {
      method: "PUT",
      body: JSON.stringify(changedInning),
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
      .then((finished) => {
        if (finished.number === 9) {
          handleEndGame();
        }
        else {
          startNewInning(atWhere);
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  if (myGame === null || currInn === null) {
    return (
      <div>Loading...</div>
    );
  }

  if (whoHitting === "Away") {
    return (
      <div>
        <div>
          <GameTitleAndBox game={myGame}></GameTitleAndBox>
        </div>
        <div className={classes.LeanLeft}>
          <LineupHolder game={myGame} teamId={myGame.awayId}></LineupHolder>
        </div>
        <div className={classes.LeanRight}>
          <InningReader currInning={currInn} hitOrder={awayOrder} endInn={handleEndInning} endGame={handleEndGame}></InningReader>
        </div>
        <div className={classes.LeanLeft}>
          <LineupHolder game={myGame} teamId={myGame.homeId}></LineupHolder>
        </div>
        <div className={classes.Instructions}>
          Each pitch is taken into the database as an individual play. When entering a play, say the following:
          "Pitch (pitch type) (pitch speed) (pitch location) hit (result) end"
          Pitch Types: Any! (Fastball, Changeup, Curveball, etc.)
          Pitch Speeds: Any!
          Pitch Locations: 1- up and in, 2 up and middle, 3 up and out, 4 middle and in, 5 middle middle, 6 middle and out, 7 low and in, 8 low and middle, 9 low and out.
          Results: Either a hit, Fly Out, Ground Out, Ball/Strike Looking/Swinging, Strikeout, or Foul.
        </div>
        <div>
          {terminateButton}
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <GameTitleAndBox game={myGame}></GameTitleAndBox>
      </div>
      <div className={classes.LeanLeft}>
        <LineupHolder game={myGame} teamId={myGame.awayId}></LineupHolder>
      </div>
      <div className={classes.LeanRight}>
        <InningReader currInning={currInn} hitOrder={homeOrder} endInn={handleEndInning} endGame={handleEndGame}></InningReader>
      </div>
      <div className={classes.LeanLeft}>
        <LineupHolder game={myGame} teamId={myGame.homeId}></LineupHolder>
      </div>
      <div className={classes.Instructions}>
        Each pitch is taken into the database as an individual play. When entering a play, say the following:
        "Pitch (pitch type) (pitch speed) (pitch location) hit (result) end"
        Pitch Types: Any! (Fastball, Changeup, Curveball, etc.)
        Pitch Speeds: Any!
        Pitch Locations: 1- up and in, 2 up and middle, 3 up and out, 4 middle and in, 5 middle middle, 6 middle and out, 7 low and in, 8 low and middle, 9 low and out.
        Results: Either a hit, Fly Out, Ground Out, Ball/Strike Looking/Swinging, Strikeout, or Foul.
      </div>
      <div>
        {terminateButton}
      </div>
    </div>
  );



}

export default GameDisplay;
