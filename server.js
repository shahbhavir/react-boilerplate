// Make sure to include the JSX transpiler
require("babel/register");

var express = require('express'),
    path = require('path'),
    app = express(),
    port = 3000,
    bodyParser = require('body-parser'),
    React = require('react'),
    ReactAddons = require('react/addons');

var ReactApp = ReactAddons.createFactory(require('./app/Home.jsx'));

// Include static assets. Not advised for production
app.use(express.static(path.join(__dirname, 'public/')));
// Set view path
app.set('views', path.join(__dirname, 'views'));
// set up ejs for templating. You can use whatever
app.set('view engine', 'ejs');

// Set up Routes for the application
app.get('/', function(req, res){
    // React.renderToString takes your component
    // and generates the markup
    var props = {
        reactOutput: ReactAddons.renderToString(ReactApp({})),
        isBot: false
    };

    var useragent = req.headers['user-agent'] && req.headers['user-agent'].toLowerCase();

    if (/googlebot|baiduspider|gurujibot|yandexbot|slurp|msnbot|bingbot|facebookexternalhit|linkedinbot|twitterbot|slackbot/i.test(useragent)) {
        // check request made by bot ?
        props.isBot = true;
    }

    res.render('index.ejs', props);
});

app.listen(port);
console.log('Server is Up and Running at Port : ' + port);
