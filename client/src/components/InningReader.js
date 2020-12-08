//styling and react components
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

//css
import classes from "./InningReader.module.css"

//component that holds the runner and hitter below the strikes, balls, and outs
const RunAndHitHold = ({ playerId, pos }) => {
  const [player, setPlayer] = React.useState(null);

//grabs player using ID
  useEffect(() => {
    const grabPerson = () =>
    fetch(`api/players`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((fetchedPlayers) => {
        const personInList = fetchedPlayers.filter(player => player.id === playerId);
        setPlayer(personInList[0]);
      })

      grabPerson();

    }, [playerId, pos]);
  if (player !== null) {
    if (pos === null) {
      return (
        <div>
          <strong>{player.name}</strong>
        </div>
      );
    }
    return (
      <div>
        <strong>{player.name}</strong>
        <small>{pos}</small>
      </div>
    );
  }
  return (<div>Loading...</div>);

}

//major component that keeps the state of the given inning
//transitions into endInning and startNewInning as needed
const InningReader = ({ currInning, hitOrder, endInn, pauseInn }) => {
  const [balls, setBalls] = React.useState(currInning ? currInning.balls : 0);
  const [strikes, setStrikes] = React.useState(currInning ? currInning.strikes : 0);
  const [outs, setOuts] = React.useState(currInning ? currInning.outs : 0);
  const [hits, setHits] = React.useState(currInning ? currInning.hits : 0);
  const [runs, setRuns] = React.useState(currInning ? currInning.runs : 0);
  const [frID, setFirstRunner] = React.useState(currInning ? currInning.firstRunnerId : 0);
  const [srID, setSecondRunner] = React.useState(currInning ? currInning.secondRunnerId : 0);
  const [trID, setThirdRunner] = React.useState(currInning ? currInning.thirdRunnerId : 0);

  const [whatHitter, setNumber] = React.useState(currInning ? currInning.ifPaused : hitOrder);

  const [hitterInfo, setHitterInfo] = React.useState([]);
  const [pitcher, setPitcher] = React.useState(0);

  //Recording Hooks
  const [buttonText, setButtonText] = React.useState("Not Listening...");
  const [buttonColor, setButtonColor] = React.useState("#eb020e");
  const [lastPlay, setLastPlay] = React.useState("Game Started");

  function noOneOn(number) {
    if (number === 0) {
      return false;
    }
    return true;
  }

  //gets the hitter id and position from a value
  function grabHitter(lineupObj, number) {
    if (number === 0) {
      return [lineupObj.firstId, lineupObj.firstPos];
    }
    else if (number === 1) {
      return [lineupObj.secondId, lineupObj.secondPos];
    }
    else if (number === 2) {
      return [lineupObj.thirdId, lineupObj.thirdPos];
    }
    else if (number === 3) {
      return [lineupObj.fourthId, lineupObj.fourthPos];
    }
    else if (number === 4) {
      return [lineupObj.fifthId, lineupObj.fifthPos];
    }
    else if (number === 5) {
      return [lineupObj.sixthId, lineupObj.sixthPos];
    }
    else if (number === 6) {
      return [lineupObj.seventhId, lineupObj.seventhPos];
    }
    else if (number === 7) {
      return [lineupObj.eighthId, lineupObj.eighthPos];
    }
    else if (number === 8) {
      return [lineupObj.ninthId, lineupObj.ninthPos];
    }
    else {
      setNumber(0);
      return [lineupObj.firstId, lineupObj.firstPos];
    }

  }

  //handles what happens a Fly Out, Ground Out, Single, Double, Triple, or HomeRun occur
  function MoveUp(bases, outJust, hitter, first, second, third) {
    const finalBases = [];
    if (bases === 0) {
      if (outJust === "F") {
        if (first !== 0) {
          finalBases.push(first);
        }
        else {
          finalBases.push(0);
        }
        if (second !== 0) {
          finalBases.push(second);
        }
        else {
          finalBases.push(0);
        }
        if (third !== 0) {
          finalBases.push(third);
        }
        else {
          finalBases.push(0);
        }

        finalBases.push(0);
      }
      else {
        if (first !== 0) {
          finalBases.push(hitter);
        }
        else {
          finalBases.push(0);
        }
        if (second !== 0) {
          finalBases.push(second);
        }
        else {
          finalBases.push(0);
        }
        if (third !== 0) {
          finalBases.push(third);
        }
        else {
          finalBases.push(0);
        }

        finalBases.push(0);
      }
    }
    else if (bases === 1) {
      finalBases.push(hitter);
      if (first !== 0) {
        finalBases.push(first);
      }
      else {
        finalBases.push(0);
      }
      if (second !== 0) {
        finalBases.push(second);
      }
      else {
        finalBases.push(0);
      }
      if (third !== 0) {
        finalBases.push(third);
      }
      else {
        finalBases.push(0);
      }
    }

    else if (bases === 2) {
      var runs = 0;
      finalBases.push(0);
      finalBases.push(hitter);
      if (first !== 0) {
        finalBases.push(first);
      }
      else {
        finalBases.push(0);
      }
      if (second !== 0) {
        runs = runs + 1;
      }
      if (third !== 0) {
        runs = runs + 1;
      }
      finalBases.push(runs);
    }

    else if (bases === 3) {
      var runs = 0;
      finalBases.push(0);
      finalBases.push(0);
      finalBases.push(hitter);
      if (first !== 0) {
        runs = runs + 1;
      }
      if (second !== 0) {
        runs = runs + 1;
      }
      if (third !== 0) {
        runs = runs + 1;
      }
      finalBases.push(runs);
    }

    else {
      finalBases.push(0);
      finalBases.push(0);
      finalBases.push(0);
      finalBases.push(4);
    }

    return finalBases;
  }

//next six functions help check and clean the given audio input
  function firstWordCheck(string) {
    const acceptableDev = ["hitch", "thich", "which", "pitch"];
    if (acceptableDev.includes(string)) {
      return true;
    }
    return false;
  }

  function speedCheck(stringOne, stringTwo) {
    if (stringOne === "a") {
      const speed = "8" + stringTwo[1];
      const loc = stringTwo[2];
      return [parseInt(speed), parseInt(loc)];
    }
    else {
      if (stringTwo === "for") {
        return [parseInt(stringOne), 4];
      }
      else if (stringTwo === "to") {
        return [parseInt(stringOne), 2];
      }
      else if (stringTwo === "three") {
        return [parseInt(stringOne), 3];
      }
      else if (stringTwo === "one") {
        return [parseInt(stringOne), 1];
      }
      else {
        return [parseInt(stringOne), parseInt(stringTwo)];
      }
    }
  }

  function splitterCheck(string) {
    const acceptableDev = ["hid", "hit"];
    if (acceptableDev.includes(string)) {
      return true;
    }
    return false;
  }

  function terminateCheck(string) {
    const acceptableDev = ["and", "end", "And", "End"];
    if (acceptableDev.includes(string)) {
      return true;
    }
    return false;
  }

  function runCheck(stringList) {
    if (stringList.includes("run")) {
      return true;
    }
    return false;
  }

  function Cleaner(string) {
    let realResult = "";
    if (string.includes(":")) {
      realResult = string.replace(":", " ");
    }
    else if (string.includes("/")) {
      realResult = string.replace("/", " ");
    }
    else if (string.includes("-")) {
      realResult = string.replace("-", " ");
    }
    else {
      realResult = string;
    }

    const myBreak = realResult.split(" ");
    const openingTF = firstWordCheck(myBreak[0]);
    const hitTF = splitterCheck(myBreak[4]);
    const endTF = terminateCheck(myBreak[myBreak.length - 1]);
    if (openingTF && hitTF && endTF) {
      const speedList = speedCheck(myBreak[2], myBreak[3]);
      let loopDex = 5;
      let hitResult = "";
      while (loopDex !== myBreak.length -1) {
        if (loopDex === 5) {
          hitResult = myBreak[loopDex];
        }
        else {
          hitResult = hitResult + " " + myBreak[loopDex]
        }
        loopDex = loopDex + 1;
      }

      return [myBreak[1], speedList[0], speedList[1], hitResult];
    }
    else {
      return ["Invalid"];
    }



    /*

    */
  }

  function resetStats() {
    setOuts(0);
    setBalls(0);
    setStrikes(0);
    setRuns(0);
    setHits(0);
    setFirstRunner(0);
    setSecondRunner(0);
    setThirdRunner(0);
  }

  //useEffect is called to check if the inning is done: if so, endInn is called. Otherwise, the state is updated.
  useEffect(() => {
    const firstStep = () => {
      if (outs === 3) {
        const returningInning = ({
          id: currInning.id,
          gameId: currInning.gameId,
          pitchingId: currInning.pitchingId,
          hittingId: currInning.hittingId,
          number: currInning.number,
          runs: runs,
          hits: hits,
          balls: 0,
          strikes: 0,
          outs: 3,
          firstRunnerId: 0,
          secondRunnerId: 0,
          thirdRunnerId: 0,
          ifPaused: 0
        });

        endInn(returningInning, whatHitter, );
        resetStats();

      }
      else {
        fetch(`api/lineups/${currInning.gameId}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.statusText);
          })
          .then((fetchedLineups) => {
            const hittersLineup = fetchedLineups.filter(lineup => currInning.hittingId === lineup.teamId);
            const pitchersLineup = fetchedLineups.filter(lineup => currInning.pitchingId === lineup.teamId);
            setPitcher(pitchersLineup[0].pitcher);
            const plaposHold = grabHitter(hittersLineup[0], whatHitter);
            setHitterInfo(plaposHold);
          })
      }
    }


      firstStep();

    }, [currInning, whatHitter]);

    //on refresh, inning is changed with a call to put
  window.onbeforeunload = function(event)
  {
    const pastInning = ({
      id: currInning.id,
      gameId: currInning.gameId,
      pitchingId: currInning.pitchingId,
      hittingId: currInning.hittingId,
      number: currInning.number,
      runs: runs,
      hits: hits,
      balls: balls,
      strikes: strikes,
      outs: outs,
      firstRunnerId: frID,
      secondRunnerId: srID,
      thirdRunnerId: trID,
      ifPaused: whatHitter
    });

    fetch(`/api/innings/${pastInning.id}`, {
      method: "PUT",
      body: JSON.stringify(pastInning),
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
      .catch(err => {
        console.error(err);
      });

  };

  //after every recording, a new play is added and the state of the program is updated
  const addNewPlay = (newPlay) => {
    const theFeed = fetch("/api/plays", {
      method: "POST",
      body: JSON.stringify(newPlay),
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
      .then(receivedPlay => {
        setLastPlay(receivedPlay.hitterResult);
        return receivedPlay.hitterResult;
      })
      .catch(err => {
        console.error(err);
      });

      theFeed.then((data) => {
        if (typeof data === 'undefined') {
          setLastPlay("Please try again");
        }
        else {
          const collectionPlay = data.split(" ");
          const loweredPlay = collectionPlay.map(word => word.toLowerCase());
          let newRUNS = 0;
          if (loweredPlay.includes("single")) {
            const runnerResults = MoveUp(1, "", hitterInfo[0], frID, srID, trID);
            setFirstRunner(runnerResults[0]);
            setSecondRunner(runnerResults[1]);
            setThirdRunner(runnerResults[2]);
            newRUNS = runnerResults[3];
            setHits(hits + 1);
            if (runCheck(loweredPlay)) {
              setThirdRunner(0);
              setRuns(runs + 1);
            }
            setRuns(runs + newRUNS);
            setNumber(whatHitter + 1);
            setLastPlay("Single");
          }
          else if (loweredPlay.includes("double")) {
            const runnerResults = MoveUp(2, "", hitterInfo[0], frID, srID, trID);
            setFirstRunner(runnerResults[0]);
            setSecondRunner(runnerResults[1]);
            setThirdRunner(runnerResults[2]);
            newRUNS = runnerResults[3];
            setHits(hits + 1);
            if (runCheck(loweredPlay)) {
              setThirdRunner(0);
              setRuns(runs + 1);
            }
            setRuns(runs + newRUNS);
            setNumber(whatHitter + 1);
            setLastPlay("Double");
          }
          else if (loweredPlay.includes("triple")) {
            const runnerResults = MoveUp(3, "", hitterInfo[0], frID, srID, trID);
            setFirstRunner(runnerResults[0]);
            setSecondRunner(runnerResults[1]);
            setThirdRunner(runnerResults[2]);
            newRUNS = runnerResults[3];
            setHits(hits + 1);
            setRuns(runs + newRUNS);
            setNumber(whatHitter + 1);
            setLastPlay("Triple");
          }
          else if (loweredPlay.includes("homerun")) {
            const runnerResults = MoveUp(4, "", hitterInfo[0], frID, srID, trID);
            setFirstRunner(runnerResults[0]);
            setSecondRunner(runnerResults[1]);
            setThirdRunner(runnerResults[2]);
            newRUNS = runnerResults[3];
            setHits(hits + 1);
            setRuns(runs + newRUNS);
            setNumber(whatHitter + 1);
            setLastPlay("Home Run");
          }
          else if (loweredPlay.includes("fly") || loweredPlay.includes("flyout")) {
            const runnerResults = MoveUp(0, "F", hitterInfo[0], frID, srID, trID);
            setFirstRunner(runnerResults[0]);
            setSecondRunner(runnerResults[1]);
            setThirdRunner(runnerResults[2]);
            newRUNS = runnerResults[3];
            if (runCheck(loweredPlay)) {
              setThirdRunner(0);
              setRuns(runs + 1);
            }
            setOuts(outs + 1);
            setBalls(0);
            setStrikes(0);
            setNumber(whatHitter + 1);
            setLastPlay("Fly Out");
          }
          else if (loweredPlay.includes("ground") || loweredPlay.includes("groundout")) {
            const runnerResults = MoveUp(0, "G", hitterInfo[0], frID, srID, trID);
            setFirstRunner(runnerResults[0]);
            setSecondRunner(runnerResults[1]);
            setThirdRunner(runnerResults[2]);
            newRUNS = runnerResults[3];
            if (runCheck(loweredPlay)) {
              setThirdRunner(0);
              setRuns(runs + 1);
            }
            setOuts(outs + 1);
            setBalls(0);
            setStrikes(0);
            setNumber(whatHitter + 1);
            setLastPlay("Ground Out");
          }
          else if (loweredPlay.includes("strike")) {
            if (strikes === 2) {
              setOuts(outs + 1);
              setBalls(0);
              setStrikes(0);
              setLastPlay("Strikeout");
            }
            else {
              setStrikes(strikes + 1);
            }
          }
          else if (loweredPlay.includes("ball")) {
            if (balls === 3) {
              setBalls(0);
              setStrikes(0);
              setFirstRunner(hitterInfo[0]);
              setLastPlay("Walk");
            }
            else {
              setBalls(balls + 1);
            }
          }
          else if (loweredPlay.includes("foul")) {
            if (strikes === 2) {
              setLastPlay("Foul Ball");
            }
            else {
              setStrikes(strikes + 1);
              setLastPlay("Foul Ball");
            }

          }
          else {
            setLastPlay("Please try again.")
          }

        }



      })

  }

  //Speech Packaging
  var indexSpeech = 0;
  var SpeechRecognition = window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.onstart = function() {
    console.log("Listening.");
  };
  recognition.onend = function() {
    recognition.abort();
  }
  recognition.onerror = function() {
    console.log("Error");
  }

  recognition.onresult = function(event) {
    var transcript = event.results[indexSpeech][0].transcript;
    var confidence = parseFloat(event.results[indexSpeech][0].confidence);
    var breakDown = Cleaner(transcript);

    if (breakDown.length !== 1 && confidence > 0.6) {
      const myPlay = ({
        inningId: currInning.id,
        pitcherId: pitcher,
        hitterId: hitterInfo[0],
        pitchType: breakDown[0],
        pitchSpeed: breakDown[1],
        pitchLocation: breakDown[2],
        hitterResult: breakDown[3]

      });
      addNewPlay(myPlay);
    }
    else {
      setLastPlay("Please try again.")

    }



    indexSpeech += 1;

};

  const listeningButton = (
    <Button
      style = {{ backgroundColor: buttonColor }}
      onClick={() => {
      if (buttonText === "Not Listening...") {
        recognition.start();
        setButtonText("Listening!");
        setButtonColor("#5ef266");
      }
      else {
        recognition.abort();
        setButtonText("Not Listening...");
        setButtonColor("#eb020e");
      }
    }}>{buttonText}</Button>
  );
  //End of Speech Packaging

  if (currInning === null) {
    return(<div>Loading...</div>);
  }

  return (
    <div className={classes.InningReader}>
      <strong className={classes.BallStrikeCounter}>Balls:</strong>
      <small className={classes.BallStrikeCounter}>{balls}</small>
      <strong className={classes.BallStrikeCounter}>Strikes:</strong>
      <small className={classes.BallStrikeCounter}>{strikes}</small>
      <strong className={classes.BallStrikeCounter}>Outs:</strong>
      <small className={classes.BallStrikeCounter}>{outs}</small>
      <div>Pitcher</div>
      <RunAndHitHold playerId={pitcher} pos={null}></RunAndHitHold>
      <div>Hitter</div>
      <RunAndHitHold playerId={hitterInfo[0]} pos={hitterInfo[1]}></RunAndHitHold>
      {noOneOn(frID) && (<div>
        <div>On first...</div>
        <RunAndHitHold playerId={frID} pos={null}></RunAndHitHold></div>)}
      {noOneOn(srID) && (<div>
                          <div>On second...</div>
                          <RunAndHitHold playerId={srID} pos={null}></RunAndHitHold></div>)}
      {noOneOn(trID) && (<div>
          <div>on third...</div>
        <RunAndHitHold playerId={trID} pos={null}></RunAndHitHold></div>)}

      {listeningButton}

      Last Play: {lastPlay}
    </div>
  );

}

export default InningReader;
