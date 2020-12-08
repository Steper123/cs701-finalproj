//styling and react components
import React, { useState, useEffect } from "react";

//css
import classes from "./StatHolders.module.css";

const HitterStatDisplay = ({ hitter }) => {

  const [stats, setStats] = React.useState([]);

  //uses the stats array and collects pitching or hitting stats based on what is required for the given athlete
  function gatherStats(plays, pos) {
    if (pos !== 1) {
      let pitchesSeen = 0;
      let pAs = 0;
      let aBs = 0;
      let singles = 0;
      let doubles = 0;
      let triples = 0;
      let homers = 0;
      let rbis = 0;
      let runs = 0;
      let sbs = 0;
      let bbs = 0;

      plays.forEach(play => {
        pitchesSeen = pitchesSeen + 1;
        const collectionPlay = play.hitterResult.split(" ");
        const loweredPlay = collectionPlay.map(word => word.toLowerCase());
        if (loweredPlay.includes("single")) {
          pAs = pAs + 1;
          aBs = aBs + 1;
          singles = singles + 1;
        }
        else if (loweredPlay.includes("double")) {
          pAs = pAs + 1;
          aBs = aBs + 1;
          doubles = doubles + 1;
        }
        else if (loweredPlay.includes("triple")) {
          pAs = pAs + 1;
          aBs = aBs + 1;
          triples = triples + 1;
        }
        else if (loweredPlay.includes("homerun")) {
          pAs = pAs + 1;
          aBs = aBs + 1;
          homers = homers + 1;
        }
        else if (loweredPlay.includes("fly") || loweredPlay.includes("flyout")) {
          pAs = pAs + 1;
          aBs = aBs + 1;
        }
        else if (loweredPlay.includes("ground") || loweredPlay.includes("groundout")) {
          pAs = pAs + 1;
          aBs = aBs + 1;
        }
      });

      return ({
        pitchesSeen: pitchesSeen,
        pAs: pAs,
        aBs: aBs,
        singles: singles,
        doubles: doubles,
        triples: triples,
        homers: homers,
        rbis: rbis,
        runs: runs,
        sbs: sbs,
        bbs: bbs
      });
    }

    else {
      let pitchesThrown = 0;
      let fbs = 0;
      let chs = 0;
      let cvs = 0;
      let other = 0;
      let outsRecord = 0;
      let hA = 0;
      let rA = 0;
      let ks = 0;
      let bbs = 0;

      plays.forEach(play => {
        pitchesThrown = pitchesThrown + 1;
        //Pitch Type
        if (play.pitchType === "fastball") {
          fbs = fbs + 1;
        }
        else if (play.pitchType === "changeup" || play.pitchType === "change") {
          chs = chs + 1;
        }
        else if (play.pitchType === "curveball" || play.pitchType === "curve") {
          cvs = cvs + 1;
        }
        else {
          other = other + 1;
        }
        //Result
        const collectionPlay = play.hitterResult.split(" ");
        const loweredPlay = collectionPlay.map(word => word.toLowerCase());
        if (loweredPlay.includes("single")) {
          hA = hA + 1;
        }
        else if (loweredPlay.includes("double")) {
          hA = hA + 1;
        }
        else if (loweredPlay.includes("triple")) {
          hA = hA + 1;
        }
        else if (loweredPlay.includes("homerun")) {
          hA = hA + 1;
          rA = rA + 1;
        }
        else if (loweredPlay.includes("fly") || loweredPlay.includes("flyout")) {
          outsRecord = outsRecord + 1;
        }
        else if (loweredPlay.includes("ground") || loweredPlay.includes("groundout")) {
          outsRecord = outsRecord + 1;
        }

    })

    return ({
      pitchesThrown: pitchesThrown,
      fbs: fbs,
      chs: chs,
      cvs: cvs,
      other: other,
      outsRecord: outsRecord,
      hA: hA,
      rA: rA,
      ks: ks,
      bbs: bbs
    });




    }


}
//finds all the plays that include a given player
  useEffect(() => {
    fetch(`api/plays`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((fetchedPlays) => {
        const filteredPlays = fetchedPlays.filter(play => play.hitterId === hitter.id);
        const myStats = gatherStats(filteredPlays, hitter.position);
        setStats(myStats);
      }).catch(err => {
        console.error(err);
      });
    }, []);

    if (hitter === null) {
      return (<div>Loading...</div>);
    }
    if (stats.aBs === null) {
      return (
        <div>
          <strong className={classes.StatHolder}>{hitter.name}</strong>
          <strong className={classes.StatHolder}>No stats recorded.</strong>
        </div>

      );
    }
    else {
      return (
        <div>
            <strong className={classes.StatHolder}>{hitter.name}</strong>
            <strong className={classes.StatHolder}>{parseFloat((stats.singles+stats.doubles+stats.triples+stats.homers)/stats.aBs).toFixed(2)}</strong>
            <strong className={classes.StatHolder}>{parseFloat((stats.singles+stats.doubles+stats.triples+stats.homers+stats.bbs)/stats.pAs).toFixed(2)}</strong>
            <strong className={classes.StatHolder}>{parseFloat((stats.singles + (stats.doubles*2) + (stats.triples*3) + (stats.homers*4))/stats.aBs).toFixed(2)}</strong>
            <strong className={classes.StatHolder}>{stats.rbis}</strong>
        </div>
      );
    }


}

export default HitterStatDisplay;
