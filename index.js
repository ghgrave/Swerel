const express = require("express");
const app = express();
const $fetch = require("node-fetch");
const keys = require("./config/keys");

const mongoose = require("mongoose");

mongoose
  .connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to database"));

const Student = require("./models/Student");

app.use(
  require("express-session")({
    secret: keys.mongooseSecret,
    resave: false,
    saveUninitialized: false,
  })
);

const passport = require("passport");
require("./services/passport");
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.set("view engine", "ejs");

// app.get('/', (req, res)=>{
//   res.render('index')
// })

require("./routes/API")(app);
require("./routes/Auth")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
