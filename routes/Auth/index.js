const keys = require("../../config/keys");
const mongoose = require('mongoose')
const passport = require('passport')
const express = require('express')

const User = require("../../models/User");

module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));
  
  app.get("/login", (req, res) => {
    res.render("login.ejs");
  });

  app.post("/login",
    passport.authenticate("local", {
      successRedirect: "/roster",
      failureRedirect: "/login"
    }),
    function (req, res) {
    }
  );

  app.get("/logout", function (req, res) {
    // When we logout, Passport destroys all user data in the session.
    req.logout();
    // redirect them to the home page
    res.redirect("/login");
  });

  app.get("/signup", (req, res) => {
    res.render("signup.ejs" , {errMsg: ''});
  });
  
  app.post("/signup", (req, res) => {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
      if (err) {
        return res.render("signup.ejs", {errMsg: 'User already exists'});
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/roster");
        });
      }
    });
  });

}
