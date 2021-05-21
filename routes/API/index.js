const Student = require('../../models/Student')

module.exports = (app) => {

  app.get('/', (req, res)=>{
    res.render('login')
  })

};
