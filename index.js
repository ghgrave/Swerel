const express = require("express");
const app = express();
const $fetch = require('node-fetch')
const keys = require("./config/keys");

const mongoose = require("mongoose");

mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const Movie = require("./models/Movie");

app.use(
  require("express-session")({
    secret: keys.mongooseSecret,
    resave: false,
    saveUninitialized: false
  })
);

const passport = require("passport");
require('./services/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
  res.render('index')
})

app.get("/test", (req, res) => {
  let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${keys.tmdbKey}&language=en-US`;
  $fetch(url)
    .then((response) => response.json())
    .then(data => {
      for(let i=1; i <= data.total_pages; i++){
        $fetch(`${url}&page=${i}`)
        .then((response) => response.json())
        .then(data => {
          data.results.forEach(movie => {
            let {id, title, vote_average, overview, release_date, poster_path } = movie
            let addMovie = {
              _id: id,
              title, 
              vote_average,
              overview,
              release_date,
              poster_path
            }
    
            Movie.create(addMovie, function (err, movie) {
                err ? console.log("Error: ", err) : console.log("Delete me Movie create");
            });
          })
          res.end()
        })
        .catch((err) => res.render("error"));
      }})
    .catch((err) => res.render("error"));
});

require("./routes/API")(app);
require("./routes/Auth")(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT);
