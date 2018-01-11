require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require("passport-auth0");
const axios = require('axios')

// const { secret } = require('../config.js').session
// const { domain, clientID, clientSecret } = require("../config.js").Auth0;
// const { NBA, NFL, MLB } = require("../config.js").Api_key;

const NBA = process.env.NBA
const NFL = process.env.NFL
const MLB = process.env.MLB
const port = process.env.PORT || 3001;
const connectionString = process.env.CONNECTION_STRING;

const app = express();
app.use( express.static( `${__dirname}/build` ) );
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
);

app.use(json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());


passport.use(new Auth0Strategy(
  {
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
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
  successRedirect: "/Home"
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
  //console.log('index.js', req.params)
  axios.get(`http://api.sportradar.us/nfl-ot2/players/${req.params.player_id}/profile.json?api_key=` + NFL).then(response => {
    //console.log(response.data);
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/NBAleague', (req, res) => {
  axios.get('http://api.sportradar.us/nba/trial/v4/en/league/hierarchy.json?api_key=' + NBA).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/NBAroster/:team_id', (req, res) => {
  //console.log(req.params);
  axios.get(`http://api.sportradar.us/nba/trial/v4/en/teams/${req.params.team_id}/profile.json?api_key=` + NBA).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/NBAplayers/:player_id', (req, res) => {
  axios.get(`http://api.sportradar.us/nba/trial/v4/en/players/${req.params.player_id}/profile.json?api_key=` + NBA).then(response => {
    //console.log(response.data);
    return res.json(response.data)
  }).catch(console.log)
})

app.get('/api/MLBschedule', (req, res) => {
  axios.get('http://api.sportradar.us/mlb-t6/games/2017/REG/schedule.json?api_key=' + MLB).then(response => {
    return res.send(response.data)
  }).catch(console.log)
})

app.get('/api/MLBplayers/:player_id', (req, res) => {
  //console.log(req.params);
  axios.get(`http://api.sportradar.us/mlb-t6/players/${req.params.player_id}/profile.json?api_key=` + MLB).then(response => {
    //console.log(response.data);
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
app.get("/api/Favorites", (req, res, next) => {
  const dbInstance = req.app.get("db")

  if(req.user.id){
  dbInstance.getFavoritesByUserId([req.user.id]).then(response => {
    //console.log(response);
    return res.json(response) })
    .catch(console.log);
  }
  else{
    console.log("failed ",req)
  }
 });

app.get("/api/test", (req, res, next) => { const dbInstance = req.app.get("db")
dbInstance.getUsers().then(response => { res.json(response) })
.catch(console.log); });

app.post('/api/postFavorites', (req, res, next) => {
  const dbInstance = req.app.get('db')
  if(req.user){
    //console.log(req.body.selectedSport);
    dbInstance.createFavorites([req.user.id, req.body.player_id, req.body.selectedSport]).then(response => { res.json(response)})
    .catch(console.log)
  }
  else {
    console.log("error", req)
  }
 });

const path = require('path')
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname + "build/index.html"))
})


app.listen(port, () => {
  console.log(`listening on da port: ${port}`);
});
