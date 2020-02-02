const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      function(email, password, done) {
        User.findOne({ email: email }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }

          bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch)
              return done(null, false, { message: "Incorrect password." });
            console.log(user);
            return done(null, user);
          });
        });
      }
    )
  );

  passport.serializeUser(function(user, done) {
    console.log({ fromSerialize: user._id });
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log({ fromDeserialize: user });
      done(err, user);
    });
  });
};
