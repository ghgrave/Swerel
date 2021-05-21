// exports.fillMovies = (User, req, res) => {
//   User.findOne({_id: req.user._id})
//                 .populate('movies')
//                 .exec((err, user)=>{
//                   !err ? res.redirect('/movie_drey') : res.render('error');
//                 })
// }

// exports.removeMovie = (User, req, res) => {
//   // User.updateOne({_id: req.user._id},
//   //   {$pull: {
//   //     movies: req.query.remove_movie_id
//   //     }
//   //   },
//   //   (err, data) => {
//   //     err ?  res.render('error') 
//   //         : res.redirect('/movie_drey');
//   //   }
//   //   )
//   User.updateOne({_id: req.user._id}, {$pull: {movies: req.query.remove_movie_id}})
//   .exec((err, user)=>{
//     !err ? res.redirect('/movie_drey') : res.render('error');
//   })
// }