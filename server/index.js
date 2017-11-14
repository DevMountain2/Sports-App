const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const port = 3001;
const connectionString = require("../config.js").massive;

const app = express();

massive(connectionString)
  .then(db => app.set("db", db))
  .catch(console.log("Connection String is here"));

app.use(json());
app.use(cors());


app.listen(port, () => {
  console.log(`listening on da port: ${port}`);
});
