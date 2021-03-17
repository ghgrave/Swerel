const keys = require("../../config/keys");
const mongoose = require('mongoose')
const passport = require('passport')

const User = require("../../models/User");
// const Movie = require("../../models/Movie");

const bodyParser = require("body-parser");


let data = {
  username: 'ghgrave',
  password: '12346',
  // movies: [
  //   {
  //     title: 'My first Ref Attempt',
  //     votes: 12,
  //     overview: 'This is my description!!!',
  //     releaseDate: "2021-03-16"
  //   }
  // ]

};

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.get("/login", (req, res) => {
    res.render("login.ejs");
    // User.create(data, (err, user)=>{
    //   err ? res.send('Error: ', err) : res.send(user);
    // });
    
  });

  app.post("/login",
    passport.authenticate("local", {
      successRedirect: "/upcoming",
      failureRedirect: "/login"
    }),
    function (req, res) {}
  );

  app.get("/logout", function (req, res) {
    // When we logout, Passport destroys all user data in the session.
    req.logout();
    // redirect them to the home page
    res.redirect("/");
  });

  app.get("/signup", (req, res) => {
    res.render("signup.ejs" , {errMsg: ''});
  });
  
  app.post("/signup", (req, res) => {
    console.log(req.body)
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
      if (err) {
        return res.render("signup.ejs", {errMsg: 'User already exists'});
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/upcoming");
        });
      }
    });
  });

}
