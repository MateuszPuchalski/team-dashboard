const express = require("express");
const cloudinary = require("cloudinary").v2;
const path = require("path");

const jwt = require("jsonwebtoken");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

require("dotenv").config();

const SECRET = process.env.JWT_SECRET;

const PlayerModel = require("./models/player.model");
const ClubModel = require("./models/club.model");
const EventModel = require("./models/event.model");
const MatchModel = require("./models/match.model");
const UserModel = require("./models/user.model");

const {
  ApolloServer,
  gql,
  AuthenticationError,
} = require("apollo-server-express");

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

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return { user: null };
      }

      const signature = token.split(" ")[1];
      const decoded = jwt.verify(signature, SECRET);
      console.log({ DECODED: decoded });
      return { user: decoded.id };
    } catch (error) {}
  },
});

server.applyMiddleware({ app });

app.listen(port, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
);
