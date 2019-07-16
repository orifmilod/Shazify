const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const env = require('dotenv');
const redirect_uri = 'http://localhost:3000'; // Your redirect uri

env.config();

const generateRandomString = function(length) {
  const text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (const i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

console.log(process.env.CLIENT_ID);
const stateKey = 'spotify_auth_state';

const app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.get('/login', (req, res) => {

  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'user-read-private user-read-email user-read-playback-state';
  const redirectURL = 'https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'token',
    client_id: process.env.CLIENT_ID,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  })
  res.redirect(redirectURL);
});

const PORT = process.env.PORT || 8888

app.listen(PORT, () => `Server is running on port ${PORT}`);
