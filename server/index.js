const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require("passport-auth0");
const axios = require('axios')

const { secret } = require('../config.js').session
const { domain, clientID, clientSecret } = require("../config.js").Auth0;
const { NBA, NFL, MLB } = require("../config.js").Api_key;

const port = 3001;
const connectionString = require("../config.js").massive;


const app = express();

app.use(json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10000 }
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
  successRedirect: "http://localhost:3000/Home"
  })
)

app.get("/api/me", function(req, res){
  if(!req.user)
  return res.status(404);
  res.status(200).json(req.user)
})
//*************************************** API CALLS TO SPORTRADAR **************************************************
app.get('/api/NBAgames', (req, res) => {
  axios.get('http://api.sportradar.us/nba/trial/v4/en/games/2017/REG/schedule.json?api_key=' + NBA).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/NFLgames', (req, res) => {
  axios.get('http://api.sportradar.us/nfl-ot1/games/2017/REG/schedule.json?api_key=' + NFL).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/NFLHierarchy', (req, res) => {
  axios.get('http://api.sportradar.us/nfl-ot2/league/hierarchy.json?api_key=' + NFL).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/NFLroster', (req, res) => {
  axios.get('http://api.sportradar.us/nfl-ot2/teams/33405046-04ee-4058-a950-d606f8c30852/full_roster.json?api_key=' + NFL).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/NFLplayers', (req, res) => {
  axios.get('http://api.sportradar.us/nfl-ot2/players/9634e162-5ff5-4372-b72b-ee1b0cb73a0d/profile.json?api_key=' + NFL).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/NBAleague', (req, res) => {
  axios.get('http://api.sportradar.us/nba/trial/v4/en/league/hierarchy.json?api_key=' + NBA).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/NBAroster', (req, res) => {
  axios.get('http://api.sportradar.us/nba/trial/v4/en/teams/583ec825-fb46-11e1-82cb-f4ce4684ea4c/profile.json?api_key=' + NBA).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/NBAplayers', (req, res) => {
  axios.get('http://api.sportradar.us/nba/trial/v4/en/players/ab532a66-9314-4d57-ade7-bb54a70c65ad/profile.json?api_key=' + NBA).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/MLBschedule', (req, res) => {
  axios.get('http://api.sportradar.us/mlb-t6/games/2017/REG/schedule.json?api_key=' + MLB).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/MLBplayers', (req, res) => {
  axios.get('http://api.sportradar.us/mlb-t6/players/6e1cac5c-b059-4b80-a267-5143b19efb27/profile.json?api_key=' + MLB).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/MLBteams', (req, res) => {
  axios.get('http://api.sportradar.us/mlb-t6/league/hierarchy.json?api_key=' + MLB).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/MLBroster', (req, res) => {
  axios.get('http://api.sportradar.us/mlb-t6/teams/aa34e0ed-f342-4ec6-b774-c79b47b60e2d/profile.json?api_key=' + MLB).then(response => {
    return res.send(response.data)
  }).catch(console.log)
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
