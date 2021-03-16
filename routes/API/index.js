const $fetch = require("node-fetch");
const keys = require("../../config/keys");

module.exports = (app) => {
  app.get("/search", (req, res) => {
    let movie_id = 12;
    let url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${keys.tmdbKey}&language=en-US`;
    $fetch(url)
      .then((response) => response.json())
      .then((data) => res.send(data))
      .catch((err) => res.render("Error", err));
  });

  app.get("/upcoming", (req, res) => {
    let url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${keys.tmdbKey}&language=en-US&page=1`;
    
    $fetch(url)
      .then((response) => response.json())
      .then((data) => res.render("upcoming", { data: data.results, pages: data.total_pages}))
      .catch((err) => res.render("error"));
  });
};
