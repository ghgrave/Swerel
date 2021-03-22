const express = require("express");
const app = express();


app.use(express.static('public'))
app.set('view engine', 'ejs')

const keys = require("./config/keys");

const passport = require("passport");
const LocalStrategy = require("passport-local");

app.use(
  require("express-session")({
    secret: "Blah blah blah", // used to calculate the hash to protect our password
    resave: false,
    saveUninitialized: false,
  })
);
const mongoose = require("mongoose");

mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// DELETE:
// .then(() =>{
//   console.log(`Connected to database.`)
// }).catch(err => console.log('I am error!!! ', err));

// const Movie = require("./models/Movie");

const User = require('./models/User')
// starts a session
app.use(passport.initialize());
// allows access to
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// stores User object in session
passport.serializeUser(User.serializeUser());
// removes User object from session
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res)=>{
  res.render('index')
})

app.get("/test", (req, res) => {
  Movie.create(data, function (err, movie) {
    err ? res.send("Error: ", err) : res.send(movie);
  });
});

require("./routes/API")(app);
require("./routes/Auth")(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT);
