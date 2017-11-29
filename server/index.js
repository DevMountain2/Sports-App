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

app.use(session({
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10000 }
  })
);

app.use(json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());


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
  if(!req.user) return res.status(404);
  res.status(200).json(req.user);
});
  //   res.status(500).send('not logged in')
  //
  // res.status(200).json(req.user)


app.get('/api/test', function(req,res) {
  const keys = Object.keys(req)
  res.json(keys)
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

app.get('/api/NFLroster/:team_id', (req, res) => {
  axios.get(`http://api.sportradar.us/nfl-ot2/teams/${req.params.team_id}/full_roster.json?api_key=` + NFL).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/NFLplayers/:player_id', (req, res) => {
  axios.get(`http://api.sportradar.us/nfl-ot2/players/${req.params.player_id}/profile.json?api_key=` + NFL).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/NBAleague', (req, res) => {
  axios.get('http://api.sportradar.us/nba/trial/v4/en/league/hierarchy.json?api_key=' + NBA).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/NBAroster/:team_id', (req, res) => {
  axios.get(`http://api.sportradar.us/nba/trial/v4/en/teams/${req.params.team_id}/profile.json?api_key=` + NBA).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/NBAplayers/:id', (req, res) => {
  axios.get(`http://api.sportradar.us/nba/trial/v4/en/players/${req.params.id}/profile.json?api_key=` + NBA).then(response => {
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

app.get('/api/MLBroster/:team_id', (req, res) => {
  axios.get(`http://api.sportradar.us/mlb-t6/teams/${req.params.team_id}/profile.json?api_key=` + MLB).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

massive(connectionString)
  .then(dbInstance => app.set("db", dbInstance))
  .catch(console.log("Connection String is here"));

// DATABASE instances
app.get("/api/Favorites", (req, res, next) => { const dbInstance = req.app.get("db")
dbInstance.getFavorites().then(response => { res.json(response) })
.catch(console.log); });

app.get("/api/test", (req, res, next) => { const dbInstance = req.app.get("db")
dbInstance.getUsers().then(response => { res.json(response) })
.catch(console.log); });

app.post('/api/Favorites', (req, res, next) => { const dbInstance = req.app.get('db');
dbInstance.createFavorites([req.user.id, req.body.player_id]).then(response => { res.json(response)})
.catch(console.log); });



app.listen(port, () => {
  console.log(`listening on da port: ${port}`);
});
