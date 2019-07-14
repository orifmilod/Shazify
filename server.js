
var express = require('express'); // Express web server framework
var Cors = require('cors');
var querystring = require('querystring');


var client_id = '68247016a306419aab0e68ea6f6ab997'; // Your client id
var client_secret = '4cd3fd02fc8046feb5a1b44ad220526d'; // Your secret
var redirect_uri = 'http://localhost:3000'; // Your redirect uri

var app = express();
app.use(Cors());

app.get('/login', function(req, res) {

    // your application requests authorization
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    }));
});


const PORT = process.env.PORT || 8888
app.listen(PORT, () => `Server is listening on port ${PORT}`);
