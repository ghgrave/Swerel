const $fetch = require("node-fetch");
const User = require('../../models/User')
const Movie = require('../../models/Movie')
const keys = require("../../config/keys");

module.exports = (app) => {

  app.get('/addmovie', isLoggedIn, (req, res)=>{
    !req.isAuthenticated() ? res.redirect('/login') : false;
    console.log('Movie id: ', req.query.add_movie)
    User.updateOne({_id: req.user._id},
      {$push: {
        movies: req.query.add_movie
        }
      },
      (err, data)=>{
        err ?  res.render('error') : (
          User.findOne({_id:req.user._id})
            .populate('movies')
            .exec((err, user)=>{
              !err ? res.send(user) : res.render('error');
          })
          
      );
      }
    )
  })

  app.get('/my_dreys', isLoggedIn, (req, res)=>{
    res.render('dreys')
  })

  app.get("/movie_drey", isLoggedIn, (req, res) => {
    User.findById({_id: req.user._id}, (err, data)=>{
      err ? res.render('error') : res.send(data.movies);
    })
  });

  app.get("/upcoming", (req, res) => {
    let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${keys.tmdbKey}&language=en-US&page=1`;
    $fetch(url)
      .then((response) => response.json())
      .then((data) => res.render("upcoming", { data: data.results, pages: data.total_pages}))
      .catch((err) => res.render("error"));
  });

  function isLoggedIn(req, res, next) {
    // isAuthenticated is a built in Passport method
    
    if (req.isAuthenticated()) {
      // next() tells it to move onto the next piece of code
      return next();
    }
    res.redirect("/login");
  }
};
