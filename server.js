const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');
const express = require('express');
const request = require('request');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const FRONTEND_URL = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:3000'
  : 'https://shazify.herokuapp.com';

const REDIRECT_URI = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:8888/callback'
  : 'https://shazify.herokuapp.com/callback';


const app = express();
const stateKey = 'spotify_auth_state';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.webm')
  }
})
let upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function generateRandomString(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.use(cors()).use(cookieParser());

// Spotify Web API authorization code flow 
// https://developer.spotify.com/documentation/general/guides/authorization-guide/
// https://github.com/spotify/web-api-auth-examples

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'user-read-private user-read-email user-read-playback-state playlist-read-private';
  const redirectURL = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
    state: state,
    scope: scope,
    response_type: 'code',
    redirect_uri: FRONTEND_URL,
    client_id: process.env.CLIENT_ID,
  });
  res.redirect(redirectURL);
});

app.get('/callback', (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  if (state === null || state !== storedState) {
    res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
  }
  else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: `Basic ${new Buffer(`${process.env.CLIENT_ID}:${process.env.SPOTIFY_SECRET}`).toString('base64')}`,
      },
      json: true,
    };
    request.post(authOptions, (error, response, body) => {
      if (error) {
        res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
        return;
      }
      if (response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;
        // we can also pass the token to the browser to make requests from there
        res.redirect(`${FRONTEND_URL}/#${querystring.stringify({ access_token, refresh_token, })}`);
      }
    });
  }
});

app.get('/refresh_token', (req, res) => {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${new Buffer(`${process.env.CLIENT_ID}:${process.env.SPOTIFY_SECRET}`).toString('base64')}`,
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({ access_token });
    }
  });
});

app.post('/audioSearch', upload.single('audio'), (req, res) => {
  const bitmap = fs.readFileSync(req.file.path);
  identify(Buffer.from(bitmap), defaultOptions, (err, httpResponse, body) => {
    if (err) res.send(err).status(500)
    res.send(body).status(200);
  });
});


//Serve our static asset if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
else {
  app.use(express.static(path.join(__dirname, '/frontend/public')));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./frontend/public/index.html"));
  });
}

const defaultOptions = {
  secure: true,
  data_type: 'audio',
  signature_version: '1',
  endpoint: '/v1/identify',
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: process.env.SHAZAM_ACCESS_KEY,
  access_secret: process.env.SHAZAM_ACCESS_SECRET,
};

function buildStringToSign(method, uri, accessKey, dataType, signatureVersion, timestamp) {
  return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
}

function sign(signString, accessSecret) {
  return crypto.createHmac('sha1', accessSecret)
    .update(new Buffer(signString, 'utf-8'))
    .digest().toString('base64');
}

/*Identifies a sample of bytes*/
function identify(data, options, callback) {
  let current_data = new Date();
  let timestamp = current_data.getTime() / 1000;

  let stringToSign = buildStringToSign('POST',
    options.endpoint,
    options.access_key,
    options.data_type,
    options.signature_version,
    timestamp
  );

  let signature = sign(stringToSign, options.access_secret);

  let formData = {
    sample: data,
    timestamp: timestamp,
    signature: signature,
    sample_bytes: data.length,
    data_type: options.data_type,
    access_key: options.access_key,
    signature_version: options.signature_version,
  }
  request.post({
    method: 'POST',
    formData: formData,
    url: "http://" + options.host + options.endpoint,
  }, callback);
}

const port = process.env.PORT || 8888;
app.listen(port, () => console.log(`Server running on port ${port} `));