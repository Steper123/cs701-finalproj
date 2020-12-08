//styling and react components
import React, { useState, useEffect } from "react";

//returns name of playerID
const LineupPlayer = ({ playerId }) => {
  const [actualPlayer, setActualPlayer] = React.useState(null);

  useEffect(() => {
      const fetchPlayer = fetch(`api/players`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then((fetchedPlayers) => {
          const myGuy = fetchedPlayers.filter(player => player.id === playerId);
          setActualPlayer(myGuy[0]);
        }).catch(err => {
          console.error(err);
        });

      fetchPlayer();
    }, [playerId]);

  if (actualPlayer !== null) {
      return (
        <strong>{actualPlayer.name}</strong>
      );
  }

  return (<div>Loading...</div>);




}

export default LineupPlayer;
