const express = require("express");
const app = express();


app.use(express.static('public'))
// app.use('/api/popular', express.static('public'));
app.set('view engine', 'ejs')

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

app.get('/', (req, res)=>{
  res.render('index')
})

app.get("/test", (req, res) => {
  Movie.create(data, function (err, movie) {
    err ? res.send("Error: ", err) : res.send(movie);
  });
});

app.get("/logout", (req, res) => {
  mongoose.disconnect();
  res.send("Disconnected!!!!");
});

require("./routes/API")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
