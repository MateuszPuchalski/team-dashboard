const { AuthenticationError } = require("apollo-server-express");
const mongoose = require("mongoose");
require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PlayerModel = require("./models/player.model");
const ClubModel = require("./models/club.model");
const EventModel = require("./models/event.model");
const MatchModel = require("./models/match.model");
const UserModel = require("./models/user.model");

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
    addMatch: (_, args) => {
      const Match = new MatchModel({
        addedBy: args.addedBy,
        competition: args.competition,
        matchDate: args.matchDate,
        homeTeam: args.homeTeam,
        awayTeam: args.awayTeam,
        homeScore: parseInt(args.homeScore, 10),
        awayScore: parseInt(args.awayScore, 10),
        ytId: args.ytId,
      });
      Match.save();
      return Match;
    },
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
      console.log({ email: args.email, password: args.password });
      const newUser = new UserModel({
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
            { expiresIn: 3600 * 24 * 7 },
            (err, token) => {
              if (err) throw err;
              console.log(newUser);
            }
          );
        });
      });
      return newUser;
    },
    login: async (parent, args, { req }) => {
      const user = await UserModel.findOne({ email: args.email });
      if (!user) throw new AuthenticationError("USER DOESNT EXIST");
      const isEqual = await bcrypt.compare(args.password, user.password);
      if (!isEqual) throw new AuthenticationError("INCORECT PASSWORD");
      const token = jwt.sign({ email: args.email, id: user._id }, SECRET, {
        expiresIn: 360000,
      });
      return { userId: user.id, email: user.email, token: token };
    },
  },

  Query: {
    currentUser: (parent, args, context) => {
      if (!context.user) throw new AuthenticationError("BOOOM");
      console.log({ User: context.user });
      return UserModel.findById(context.user);
    },
    playerOne: () => PlayerModel.findOne().populate(["currentClub"]),
    playerMany: () => PlayerModel.find().populate(["currentClub"]),
    playerById: (_, args, context) => {
      // if(context.headers.authorization){
      //   const token = context.headers.authorization.split(" ")

      // }
      return PlayerModel.findById(args.id).populate(["currentClub"]);
    },
    playerByClub: (_, args) =>
      PlayerModel.find({ currentClub: args.clubId }).populate(["currentClub"]),

    clubMany: () => ClubModel.find(),
    clubById: (parent, args) => {
      ClubModel.findById(args.id);
    },
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
    matchByUser: (_, args, context) =>
      MatchModel.find({ addedBy: context.user }).populate([
        "homeTeam",
        "awayTeam",
      ]),
    matchById: (_, args) =>
      MatchModel.findById(args.matchId).populate(["homeTeam", "awayTeam"]),
  },
};

module.exports = resolvers;
