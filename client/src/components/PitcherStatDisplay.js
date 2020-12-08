//styling and react components
import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";

//css
import classes from "./StatHolders.module.css";

//displays the stats for a pitcher
const PitcherStatDisplay = ({ pitcher }) => {
  const [stats, setStats] = React.useState([]);

  //same function as in the HitterStatsDisplay (described there)
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

//gets all the plays associated with the ID
  useEffect(() => {
    fetch(`api/plays`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((fetchedPlays) => {
        const filteredPlays = fetchedPlays.filter(play => play.pitcherId === pitcher.id);
        const myStats = gatherStats(filteredPlays, pitcher.position);
        setStats(myStats);
      }).catch(err => {
        console.error(err);
      });
    }, []);

    if (pitcher === null) {
      return (<div>Loading...</div>);
    }
    else if (pitcher.outsRecord === 0) {
      return (
        <div>
          <Row>
            <Col>
              <strong>{pitcher.name}</strong>
              <strong>No stats recorded.</strong>
              <strong>{pitcher.outsRecord}</strong>
            </Col>
          </Row>
        </div>
      );

    }
    else {
      return (
        <div>
          <strong className={classes.StatHolder}>{pitcher.name}</strong>
          <strong className={classes.StatHolder}>{parseFloat(stats.fbs/stats.pitchesThrown).toFixed(2)}</strong>
          <strong className={classes.StatHolder}>{parseFloat(stats.outsRecord/3).toFixed(2)}</strong>
          <strong className={classes.StatHolder}>{parseFloat((stats.rA*9)/(stats.outsRecord/3)).toFixed(2)}</strong>
          <strong className={classes.StatHolder}>{parseFloat((stats.hA+stats.bbs)/(stats.outsRecord/3)).toFixed(2)}</strong>
          <strong className={classes.StatHolder}>{parseFloat(stats.ks/(stats.outsRecord/3) * 9).toFixed(2)}</strong>
          <strong className={classes.StatHolder}>{parseFloat(stats.ks/stats.bbs).toFixed(2)}</strong>
        </div>
      );
    }


}

export default PitcherStatDisplay;
