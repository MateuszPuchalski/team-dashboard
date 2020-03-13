import React, { useState, useEffect } from "react";

import useEvents from "./useEvents";

export default function useThrowEfficiency({ matchId }) {
  const [eventsLoading, events] = useEvents({ matchId });
  const loading = false;
  const playerStats = [];

  if (!eventsLoading) {
    events.forEach(event => {
      if (event.type === "Throw" || event.type === "Turnover") {
        const playerIndex = playerStats.findIndex(
          player => player.id == event.player._id
        );
        if (playerIndex == -1) {
          if (event.type === "Throw") {
            // Goal stats
            if (event.throw.outcome === "Goal") {
              playerStats.push({
                id: event.player._id,
                name: event.player.name,
                throwCount: 1,
                madeThrows: 1,
                missThrows: 0,
                turnoversCount: 0
              });
            } else {
              playerStats.push({
                id: event.player._id,
                name: event.player.name,
                throwCount: 1,
                madeThrows: 0,
                missThrows: 1,
                turnoversCount: 0
              });
            }
          }
          //Turnover
          if (event.type === "Turnover") {
            playerStats.push({
              id: event.player._id,
              name: event.player.name,
              throwCount: 0,
              madeThrows: 0,
              missThrows: 0,
              turnoversCount: 1
            });
          }
        } else {
          //if player was found
          if (event.type === "Throw") {
            if (event.throw.outcome === "Goal") {
              playerStats[playerIndex].throwCount =
                playerStats[playerIndex].throwCount + 1;
              playerStats[playerIndex].madeThrows =
                playerStats[playerIndex].madeThrows + 1;
            } else {
              playerStats[playerIndex].throwCount =
                playerStats[playerIndex].throwCount + 1;
              playerStats[playerIndex].missThrows =
                playerStats[playerIndex].missThrows + 1;
            }
          }

          //turvoner
          if (event.type === "Turnover") {
            playerStats[playerIndex].turnoversCount =
              playerStats[playerIndex].turnoversCount + 1;
          }
        }
      }
    });
  }

  playerStats.sort((a, b) => {
    return b.throwCount - a.throwCount;
  });

  return [loading, playerStats];
}
