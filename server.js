const express = require('express'); // Express web server framework
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const redirect_uri = 'http://localhost:3000'; // Your redirect uri
const path = require('path');
const app = express();

const stateKey = 'spotify_auth_state';

let generateRandomString = (length) => {
    let text   = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.use(cors())
   .use(cookieParser());

app.get('/login', (req, res) => {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  let scope = 'user-read-private user-read-email user-read-playback-state playlist-read-private';
  let redirectURL = 'https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'token',
    client_id:'68247016a306419aab0e68ea6f6ab997' ,//process.env.CLIENT_ID
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  });
  res.redirect(redirectURL);
});

//Serve our static asset if in production
if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
else 
{
    app.use(express.static(path.join(__dirname, '/client/public')));
    app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
    });
}

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => `Server is running on port ${PORT}`);
