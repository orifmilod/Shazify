const fs = require('fs');
const path = require('path');
const cors = require('cors');
const crypto = require('crypto');
const express = require('express');             // Express web server framework
const request = require('request');
const multer = require('multer');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const redirect_uri = 'https://shazify.herokuapp.com/';   // Your redirect uri
const app = express();
const stateKey = 'spotify_auth_state';

//Routes 
const authRoute = require('./Routes/Auth');
app.use('/api/user', authRoute);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,  Date.now() + '.webm')
    }
  })
let upload = multer({ storage });

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
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'user-read-private user-read-email user-read-playback-state playlist-read-private';
  const redirectURL = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
        response_type: 'token',
        client_id: process.env.CLIENT_ID, 
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    });
  res.redirect(redirectURL);
});

app.post('/audioSearch', upload.single('audio'), (req, res) => {
    const bitmap = fs.readFileSync(req.file.path);
    identify(Buffer.from(bitmap), defaultOptions, function (err, httpResponse, body) {
        if (err) res.send(err).status(500)
        res.send(body).status(200);
    });
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
    app.get("*", (req, res) =>  {
        res.sendFile(path.join(__dirname, "./client/public/index.html"));
    });
}

const defaultOptions = {
    host: 'identify-eu-west-1.acrcloud.com',
    endpoint: '/v1/identify',
    signature_version: '1',
    data_type:'audio',
    secure: true,
    access_key: process.env.SHAZAM_ACCESS_KEY,
    access_secret: process.env.SHAZAM_ACCESS_SECRET
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
  
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => `Server is running on port ${PORT}`);
