const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Mutation {
    addMatch(
      addedBy: String
      competition: String
      matchDate: String
      homeTeam: String!
      awayTeam: String!
      homeScore: Int
      awayScore: Int
      ytId: String
    ): Match
    addSomeEvent(matchId: String!, type: String!, timestamp: Float!): Event
    addThrowEvent(
      matchId: String!
      player: String!
      team: String!
      type: String!
      location: [Float]!
      endLocation: [Float]!
      outcome: String
      technique: String
      timestamp: Float!
    ): Event
    addPunishmentEvent(
      matchId: String!
      player: String!
      team: String!
      type: String!
      location: [Float]!
      punishmentType: String!
      timestamp: Float!
    ): Event
    addTurnoverEvent(
      matchId: String!
      player: String!
      team: String!
      type: String!
      location: [Float]!
      turnoverType: String!
      timestamp: Float!
    ): Event
    login(email: String!, password: String!): AuthData
    createUser(email: String!, password: String!): User
  }
  type Query {
    currentUser: User
    playerOne: Player
    playerById(id: String): Player
    playerByClub(clubId: String!): [Player]!
    playerMany: [Player]!
    clubMany: [Club]!
    clubById(id: String!): Club!
    eventMany: [Event]!
    eventByMatch(matchId: String!): [Event]!
    eventByPlayer(playerId: String!): [Event]!
    eventThrowByPlayer(playerId: String!): [Event]!
    matchMany: [Match]!
    matchByUser(addedBy: String!): [Match]!
    matchById(matchId: String!): Match
  }

  type User {
    id: ID!
    email: String!
    password: String!
  }
  type AuthData {
    userId: ID
    email: String
    token: String
    # tokenExpiration: Int!
  }
  type Player {
    id: ID!
    name: String!
    currentClub: Club
    position: String
    weight: String
    height: String
    jerseyNumber: Int
    avatar: String
  }
  type Match {
    id: ID!
    date: String
    homeTeam: Club!
    awayTeam: Club!
    homeScore: Int
    awayScore: Int
    ytId: String
  }

  type Club {
    id: ID!
    name: String
    logo: String
    players: [Player]
  }
  interface Event {
    id: ID!
    matchId: String
    type: String
    timestamp: Float
  }
  type SomeEvent implements Event {
    id: ID!
    matchId: String!
    type: String
    timestamp: Float!
  }
  type ThrowEvent implements Event {
    id: ID!
    matchId: String
    team: String
    type: String
    playPattern: String
    timestamp: Float
    player: Player
    location: [Float]
    throw: Throw
  }
  type Throw {
    endLocation: [Float]
    outcome: String
    technique: String
    type: String
  }
  type TurnoverEvent implements Event {
    id: ID!
    matchId: String
    team: String
    type: String
    playPattern: String
    timestamp: Float
    player: Player
    location: [Float]
    turnover: Turnover
  }
  type Turnover {
    type: String
  }
  type PunishmentEvent implements Event {
    id: ID!
    matchId: String
    team: String
    type: String
    timestamp: Float
    player: Player
    location: [Float]
    punishment: Punishment
  }
  type Punishment {
    type: String
  }
`;

module.exports = typeDefs;
