// const $fetch = require("node-fetch");
const moment = require('moment')
const User = require('../../models/User')
const Movie = require('../../models/Movie')
// const keys = require("../../config/keys");
const {fillMovies, removeMovie} = require('../../helpers/queries')
const {isLoggedIn} = require('../../helpers/auth')

module.exports = (app) => {

  app.get('/addmovie', isLoggedIn, (req, res)=>{
    !req.isAuthenticated() ? res.redirect('/login') : false;
    User.find({_id: req.user._id}, (err, test)=> {
      !test[0].movies.includes(req.query.add_movie) ? 
        (User.updateOne({_id: req.user._id},
          {$push: {
            movies: req.query.add_movie
            }
          },
          (err, data)=>{
            err ?  res.render('error') 
            : fillMovies(User, req, res);
          }))
        : res.send('Already exists!!!');
    })
  })

  app.get('/removemovie', (req, res)=> {
    removeMovie(User, req, res);
  })

  app.get('/my_dreys', isLoggedIn, (req, res)=>{
    res.render('my_dreys')
  })

  app.get("/movie_drey", isLoggedIn, (req, res) => {
    User.findOne({_id:req.user._id})
    .populate('movies') 
    .exec((err, user)=>{
      !err ? res.render("d_movies", {data: user}) : res.render('error');
    })
  });

  app.get("/upcoming", (req, res) => {
    let now = moment().subtract(7, 'd').format('YYYY-MM-DD')
    console.log(now)
    Movie.find({"release_date" : {$gte: now}})
      .sort({"release_date": -1})
      .exec((err, movies)=> {
        err ? 
          res.send(err)
          : (
            console.log(movies.length),
            res.render("upcoming", { data: movies})
            )
    })
  });
};
