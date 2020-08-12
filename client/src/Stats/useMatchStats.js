import { useState, useEffect, useReducer } from "react";
import { useQuery, gql } from "@apollo/client";

const SET_MATCH_THROW_EFFICIENCY = "SET_MATCH_THROW_EFFICIENCY";
const SET_HOMETEAM = "SET_HOMETEAM";
const SET_HOMETEAM_SUMMARY = "SET_HOMETEAM_SUMMARY";
const SET_AWAYTEAM = "SET_AWAYTEAM";
const SET_AWAYTEAM_SUMMARY = "SET_AWAYTEAM_SUMMARY";
const SET_MATCH_SUMMARY = "SET_MATCH_SUMMARY";
const MATCH = gql`
  query Match($matchId: String!) {
    matchById(matchId: $matchId) {
      homeTeam {
        id
        name
        players {
          id
          name
        }
      }
      awayTeam {
        id
        name
        players {
          id
          name
        }
      }
    }
    eventByMatch(matchId: $matchId) {
      type
      ... on ThrowEvent {
        team
        player {
          id
          name
        }
        throw {
          endLocation
          outcome
          technique
        }
      }
    }
  }
`;

const initialState = {
  throws: {
    total: 0,
    miss: 0,
    post: 0,
    goals: 0,
    saved: 0,
  },
  turnovers: {
    catch: 0,
    dribble: 0,
    pass: 0,
  },
  punishments: {
    twoMins: 0,
    yellowCards: 0,
    redCards: 0,
    blueCards: 0,
  },
  homeTeam: {
    id: "",
    name: "",
    throws: {
      efficiency: 0,
    },
  },
  awayTeam: {
    id: "",
    name: "",
    throws: {
      efficiency: 0,
    },
  },
};
const reducer = (state, action) => {
  switch (action.type) {
    case SET_MATCH_SUMMARY:
      return {
        ...state,
        throws: action.paylode.throws,
        turnovers: action.paylode.turnovers,
        punishments: action.paylode.punishments,
      };
      break;
    case SET_HOMETEAM:
      return { ...state, homeTeam: action.paylode };
      break;
    case SET_AWAYTEAM:
      return { ...state, awayTeam: action.paylode };
      break;
    case SET_HOMETEAM_SUMMARY:
      return {
        ...state,
        homeTeam: {
          ...state.homeTeam,
          ...action.paylode,
        },
      };
      break;
    case SET_AWAYTEAM_SUMMARY:
      return {
        ...state,
        awayTeam: {
          ...state.awayTeam,
          ...action.paylode,
        },
      };
      break;

    default:
      break;
  }
};

export default function useMatchStats(matchId) {
  const [matchInfo, dispatch] = useReducer(reducer, initialState);
  const { loading, error, data } = useQuery(MATCH, {
    variables: {
      matchId: matchId,
    },
  });

  useEffect(() => {
    if (data) {
      const homeTeamEvents = data.eventByMatch.filter((element) => {
        return element.team == data.matchById.homeTeam.id;
      });
      console.log({ home: homeTeamEvents });
      const awayTeamEvents = data.eventByMatch.filter((element) => {
        return element.team == data.matchById.awayTeam.id;
      });
      console.log({ away: awayTeamEvents });

      console.log(data.eventByMatch);
      console.log({ reduced: matchEventSummary(data.eventByMatch) });
      dispatch({
        type: SET_MATCH_SUMMARY,
        paylode: matchEventSummary(data.eventByMatch),
      });
      dispatch({ type: SET_HOMETEAM, paylode: data.matchById.homeTeam });
      dispatch({ type: SET_AWAYTEAM, paylode: data.matchById.awayTeam });
      dispatch({
        type: SET_HOMETEAM_SUMMARY,
        paylode: matchEventSummary(homeTeamEvents),
      });
      dispatch({
        type: SET_AWAYTEAM_SUMMARY,
        paylode: matchEventSummary(awayTeamEvents),
      });
    }
  }, [data]);

  return [loading, error, matchInfo];
}

function matchEventSummary(matchEvents) {
  const throws = matchEvents.filter((element) => {
    return element.type === "Throw";
  });

  const savedThrows = throws.filter(
    (element) => element.throw.outcome === "Saved"
  );
  const missThrows = throws.filter(
    (element) => element.throw.outcome === "Miss"
  );
  const postThrows = throws.filter(
    (element) => element.throw.outcome === "Post"
  );

  const goals = throws.filter((element) => element.throw.outcome === "Goal");

  const turnovers = matchEvents.filter((element) => {
    return element.type === "Turnover";
  });

  const dribbleTurnovers = turnovers.filter((element) => {
    return element.turnover === "Dribble";
  });
  const catchTurnovers = turnovers.filter((element) => {
    return element.turnover === "Catch";
  });
  const passTurnovers = turnovers.filter((element) => {
    return element.turnover === "Pass";
  });

  const punishments = matchEvents.filter((element) => {
    return element.punishment === "Punishment";
  });
  const yellowCards = matchEvents.filter((element) => {
    return element.punishment === "Yellow Card";
  });
  const redCards = matchEvents.filter((element) => {
    return element.punishment === "Red Card";
  });
  const blueCards = matchEvents.filter((element) => {
    return element.punishment === "Blue Card";
  });
  const twoMins = matchEvents.filter((element) => {
    return element.punishment === "2min";
  });

  return {
    throws: {
      total: throws.length,
      goals: goals.length,
      saved: savedThrows.length,
      miss: missThrows.length,
      post: postThrows.length,
      efficiency: Math.round((goals.length / throws.length) * 100) / 100,
    },
    turnovers: {
      total: turnovers.length,
      dribble: dribbleTurnovers.length,
      catch: catchTurnovers.length,
      pass: passTurnovers.length,
    },
    punishments: {
      total: punishments.length,
      yellowCard: yellowCards.length,
      redCard: redCards.length,
      blueCard: blueCards.length,
      twoMin: twoMins.length,
    },
  };
}
