const express = require("express");
const cloudinary = require("cloudinary").v2;
const path = require("path");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

const PlayerModel = require("./models/player.model");
const ClubModel = require("./models/club.model");
const EventModel = require("./models/event.model");
const MatchModel = require("./models/match.model");
const UserModel = require("./models/user.model");

const { ApolloServer, gql } = require('apollo-server-express');

const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const uri = process.env.ATLAS_URI;

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB Connected");
});

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const typeDefs = gql`
  type Mutation {
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
    createUser(email: String!, password: String!, role: [String!]!): User
  }
  type Query {
    playerOne: Player
    playerById(id: String!): Player
    playerByClub(clubId: String!): [Player]!
    playerMany: [Player]!
    clubMany: [Club]!
    eventMany: [Event]!
    eventByMatch(matchId: String!): [Event]!
    eventByPlayer(playerId: String!): [Event]!
    eventThrowByPlayer(playerId: String!): [Event]!
    matchMany: [Match]!
    matchById(matchId: String!): Match
  }
  type User {
    id: ID!
    email: String!
    password: String!
    role: [String!]!
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
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
    timestamp: Float
    player: Player
    location: [Float]
    throw: Throw
  }
  type Throw {
    endLocation: [Float]
    outcome: String
    technique: String
  }
  type TurnoverEvent implements Event {
    id: ID!
    matchId: String
    team: String
    type: String
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

const resolvers = {
  Event: {
    __resolveType(event, context, info) {
      if (event.throw) {
        return "ThrowEvent";
      }
      if (event.turnover) {
        return "TurnoverEvent";
      }
      if (event.punishment) {
        return "PunishmentEvent";
      }
      return "SomeEvent";
    },
  },

  Club: {
    players: (parent) => {
      return PlayerModel.find({
        currentClub: mongoose.Types.ObjectId(parent.id),
      });
    },
  },
  Player: {
    currentClub: async (parent) => {
      return await ClubModel.findOne({
        _id: parent.currentClub,
      });
    },
  },

  Mutation: {
    addThrowEvent: (_, args) => {
      console.log(args);
      const ThrowEvent = new EventModel({
        matchId: args.matchId,
        player: args.player,
        team: args.team,
        type: args.type,
        location: args.location,
        throw: {
          endLocation: args.endLocation,
          outcome: args.outcome,
          technique: args.technique,
        },
        timestamp: args.timestamp,
      });
      ThrowEvent.save();
      return ThrowEvent;
    },
    addSomeEvent: (_, args) => {
      console.log(args);
      const SomeEvent = new EventModel({
        matchId: args.matchId,

        type: args.type,

        timestamp: args.timestamp,
      });
      SomeEvent.save();
      return SomeEvent;
    },
    addTurnoverEvent: (_, args) => {
      console.log(args);
      const TurnoverEvent = new EventModel({
        matchId: args.matchId,
        player: args.player,
        team: args.team,
        type: args.type,
        location: args.location,
        turnover: {
          type: args.turnoverType,
        },
        timestamp: args.timestamp,
      });
      TurnoverEvent.save();
      return TurnoverEvent;
    },
    addPunishmentEvent: (_, args) => {
      console.log(args);
      const PunishmentEvent = new EventModel({
        matchId: args.matchId,
        player: args.player,
        team: args.team,
        type: args.type,
        location: args.location,
        punishment: {
          type: args.punishmentType,
        },
        timestamp: args.timestamp,
      });
      PunishmentEvent.save();
      return PunishmentEvent;
    },
    createUser: (_, args) => {
      const newUser = new UserModel({
        role: args.role,
        email: args.email,
        password: args.password,
      });
      bcrypt.hash(newUser.password, 10, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { email: user.email },
            SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              console.log(newUser);
            }
          );
        });
      });
      return newUser;
    },
  },

  Query: {
    playerOne: () => PlayerModel.findOne().populate(["currentClub"]),
    playerMany: () => PlayerModel.find().populate(["currentClub"]),
    playerById: (_, args) =>
      PlayerModel.findById(args.id).populate(["currentClub"]),
    playerByClub: (_, args) =>
      PlayerModel.find({ currentClub: args.clubId }).populate(["currentClub"]),

    clubMany: () => ClubModel.find(),
    eventMany: () => EventModel.find(),
    eventByMatch: (_, args) =>
      EventModel.find({
        matchId: mongoose.Types.ObjectId(args.matchId),
      }).populate(["player"]),
    eventByPlayer: (_, args) =>
      EventModel.find({
        player: mongoose.Types.ObjectId(args.playerId),
      }),
    eventThrowByPlayer: (_, args) =>
      EventModel.find({
        player: mongoose.Types.ObjectId(args.playerId),
        type: "Throw",
      }),
    matchMany: () => MatchModel.find().populate(["homeTeam", "awayTeam"]),
    matchById: (_, args) =>
      MatchModel.findById(args.matchId).populate(["homeTeam", "awayTeam"]),
  },
};

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
)