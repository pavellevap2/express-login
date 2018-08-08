const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const express = require("express");

const router = express.Router();

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      return err
        ? done(err)
        : user
          ? password === user.password
            ? done(null, user)
            : done(null, false, { message: "Incorrect password." })
          : done(null, false, { message: "Incorrect username." });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    err ? done(err) : done(null, user);
  });
});

router.post("api/signUp", function(req, res) {
  console.log(req.body.username, "here");
  const user = {
    email: req.body.email,
    password: req.body.password,
    id: req.body.email + req.body.password
  };

  res.status(200);
  res.json(user);
});

module.exports = router;