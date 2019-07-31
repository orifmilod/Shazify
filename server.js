const fs = require('fs');
const url = require('url');
const path = require('path');
const cors = require('cors');
const crypto = require('crypto');
const express = require('express');             // Express web server framework
const request = require('request');
const multer = require('multer');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const redirect_uri = 'https://ispotify.herokuapp.com';   // Your redirect uri
const app = express();
const stateKey = 'spotify_auth_state';


const storage = multer.diskStorage({
    destination: './uploads'
})

const upload = multer({ storage: storage })

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

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
    client_id:'process.env.CLIENT_ID',
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  });
  res.redirect(redirectURL);
});

app.post('/audioSearch', upload.single('audio'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    res.sendStatus(201)
    // identify(new Buffer(bitmap), defaultOptions, function (err, httpResponse, body) {
    //     if (err) console.log(err);
    //     console.log(body);
    // });
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

// Replace "###...###" below with your project's host, access_key and access_secret.
const defaultOptions = {
    host: 'identify-eu-west-1.acrcloud.com',
    endpoint: '/v1/identify',
    signature_version: '1',
    data_type:'audio',
    secure: true,
    access_key: 'ACCESS_KEY',
    access_secret: 'ACCESS_SECRET'
 };
  
  function buildStringToSign(method, uri, accessKey, dataType, signatureVersion, timestamp) {
    return [method, uri, accessKey, dataType, signatureVersion, timestamp].join('\n');
  }
  
  function sign(signString, accessSecret) 
  {
    return crypto.createHmac('sha1', accessSecret)
      .update(new Buffer(signString, 'utf-8'))
      .digest().toString('base64');
  }
  
  /*Identifies a sample of bytes*/
  function identify(data, options, cb) {
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
          access_key:options.access_key,
          data_type:options.data_type,
          signature_version:options.signature_version,
          signature:signature,
          sample_bytes:data.length,
          timestamp:timestamp,
      }
      request.post({
          url: "http://" + options.host + options.endpoint,
          method: 'POST',
          formData: formData
      }, cb);
  }
  
const bitmap = fs.readFileSync('sample.wav');
const PORT = process.env.PORT || 8888;

//serve out any static files in our public HTML folder
app.listen(PORT, () => `Server is running on port ${PORT}`);
