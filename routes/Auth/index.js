const keys = require("../../config/keys");
const mongoose = require('mongoose')

const User = require("../../models/User");
// const Movie = require("../../models/Movie");

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
  
  app.get("/login", (req, res) => {
    User.create(data, (err, user)=>{
      err ? res.send('Error: ', err) : res.send(user);
    });
    
  });

  app.get("/logout", (req, res) => {
    mongoose.disconnect();
    res.send("Disconnected!!!!");
  });
}
