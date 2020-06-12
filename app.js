const express = require("express");
const cloudinary = require("cloudinary").v2;
const path = require("path");

const PlayerModel = require("./models/player.model");
const ClubModel = require("./models/club.model");
const EventModel = require("./models/event.model");
const MatchModel = require("./models/match.model");
// const newEvent = new EventModel({
//   matchId: "5e3758f1e60e452598df6397",
//   type: "Throw",
//   timestamp: 123,
//   throw: {
//     endLocation: [1, 1],
//     outcome: "Goal",
//     technique: "Hip Shot",
//   },
//   location: [1, 1],
//   player: "5e3606a51dba6b0ac451eb42",
// });
// newEvent.save().then((event) => console.log(event));

const { ApolloServer, gql } = require("apollo-server");

require("dotenv").config();

const mongoose = require("mongoose");

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
  type Query {
    hello: String
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

server
  .listen({ port })
  .then(({ url }) => console.log(`Server running at: ${url}`));
