const $fetch = require("node-fetch");
const keys = require("../../config/keys");

module.exports = (app) => {
  app.get("/api/search", (req, res) => {
    let movie_id = 12;
    let url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${keys.tmdbKey}&language=en-US`;
    $fetch(url)
      .then((response) => response.json())
      .then((data) => res.send(data))
      .catch((err) => res.end("Err", err));
  });

  app.get("/api/popular", (req, res) => {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=${keys.tmdbKey}&language=en-US`;
    $fetch(url)
      .then((response) => response.json())
      .then((data) => res.send(data))
      .catch((err) => res.end("Err", err));
  });
};
