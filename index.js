const express = require("express");
const app = express();

const axios = require('axios')
const $fetch = require('node-fetch')

const keys = require("./config/keys");

const mongoose = require("mongoose");

mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// DELETE:
// .then(() =>{
//   console.log(`Connected to database.`)
// }).catch(err => console.log('I am error!!! ', err));
const Movie = require("./models/Movie");

let data = {
  title: "Test Heroku",
  votes: 12345,
  overview: "Heroku Movie about nothing right now",
  releaseDate: "3-30-2021",
};

app.get("/test", (req, res) => {
  // Instead of using new() and save() functions, use the create() method
  Movie.create(data, function (err, movie) {
    err ? res.send("Error: ", err) : res.send(movie);
  });
});

app.get('/api/search', (req, res)=>{
  let movie_id = 129;
  let url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${keys.tmdbKey}&language=en-US`
  $fetch(url)
  .then(response => response.json())
  .then(data => res.send(data))
  .catch(err => res.end("Err", err)) 
})

app.get('/api/popular', (req, res)=>{
  let url = `https://api.themoviedb.org/3/movie/popular?api_key=${keys.tmdbKey}&language=en-US`
  $fetch(url)
  .then(response => response.json())
  .then(data => res.send(data))
  .catch(err => res.end("Err", err)) 
})

app.get('/logout',(req, res)=>{
  mongoose.disconnect();
  res.send('Disconnected!!!!')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);
