const express = require("express");
const app = express();

const $fetch = require('node-fetch')

app.use(express.static('public'))
app.set('view engine', 'ejs')

const keys = require("./config/keys");

const passport = require("passport");
const LocalStrategy = require("passport-local");

app.use(
  require("express-session")({
    secret: keys.mongooseSecret, // used to calculate the hash to protect our password
    resave: false,
    saveUninitialized: false
  })
);
const mongoose = require("mongoose");

mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const Movie = require("./models/Movie");
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
  let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${keys.tmdbKey}&language=en-US`;
  $fetch(url)
    .then((response) => response.json())
    .then(data => {
      for(let i=1; i <= 2; i++){
        $fetch(`${url}&page=${i}`)
        .then((response) => response.json())
        .then(data => {
          data.results.forEach(movie => {
            let addMovie = {
              _id: movie.id,
              title: movie.title, 
              vote_average: movie.vote_average,
              overview: movie.overview,
              release_date: movie.release_date,
              poster_path: movie.poster_path
            }
    
            Movie.create(addMovie, function (err, movie) {
                err ? res.send("Error: ", err) : console.log(movie);
            });
          })
        })
        .catch((err) => res.render("error"));
      }})
    .catch((err) => res.render("error"));
});

require("./routes/API")(app);
require("./routes/Auth")(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT);
