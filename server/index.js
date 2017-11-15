const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require("passport-auth0");

const { secret } = require('../config.js').session
const { domain, clientID, clientSecret } = require("../config.js").Auth0;

const port = 3001;
const connectionString = require("../config.js").massive;

const app = express();

app.use(json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false
  })
);

passport.use(new Auth0Strategy(
  {
    domain,
    clientID,
    clientSecret,
    callbackURL: "/login"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    app.get("db").getUserByAuthId(profile.id).then(response =>{
      if(!response[0]){
        app.get("db").createUserByAuth([profile.id, profile.displayName]).then(created => {
          console.log(created);
          return done(null, created[0])
        });
      } else {
        return done(null, response[0]);
      }
    })
  }
));

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  done(null, obj)
})

app.get("/login", passport.authenticate("auth0", {
  successRedirect: "http://localhost:3000/"
  })
)

app.get("/api/me", function(req, res){
  if(!req.user)
  return res.status(404);
  res.status(200).json(req.user)
})




massive(connectionString)
  .then(dbInstance => app.set("db", dbInstance))
  .catch(console.log("Connection String is here"));


app.get("/api/test", (req, res, next) => { const dbInstance = req.app.get("db")
dbInstance.getUsers().then(response => { res.json(response) })
.catch(console.log); });



app.listen(port, () => {
  console.log(`listening on da port: ${port}`);
});
