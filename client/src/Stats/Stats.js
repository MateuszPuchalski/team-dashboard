import React, { useEffect } from "react";
import useMatchStats from "./useMatchStats";
import TeamComparison from "./TeamComparison";
import { useParams } from "react-router-dom";
export default function Stats() {
  const { matchId } = useParams();
  const [loading, error, matchInfo] = useMatchStats(matchId); //"5e6553c81c9d44000046425e"

  if (error) return <h3>SOMETHING WENT WRONG</h3>;
  if (loading) return <h3>LOADING...</h3>;
  if (matchInfo) {
    console.log({ matchInfo: matchInfo });
    return (
      <div>
        {/* <h3>
          HOME TEAM: {matchInfo.homeTeam.name} Efficiency:{" "}
          {matchInfo.homeTeam.throws.efficiency}
        </h3>
        <h3>
          AWAY TEAM: {matchInfo.awayTeam.name} Efficiency:{" "}
          {matchInfo.awayTeam.throws.efficiency}
        </h3>
        <div>
          <h3>TOTAL THROWS: {matchInfo.throws.total}</h3>
          <h3>MISS THROWS: {matchInfo.throws.miss}</h3>
          <h3>GOALS: {matchInfo.throws.goals}</h3>
          <h3>MATCH THROW EFFICIENCY: {matchInfo.throws.efficiency}</h3>;
        </div> */}
        <TeamComparison matchId={matchId} />
      </div>
    );
  }
}
