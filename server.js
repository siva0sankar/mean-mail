var express      = require('express');
var app          = express();
var port         = process.env.PORT || 8080;
var morgan       = require('morgan');
var mongoose     = require('mongoose');
var bodyParser   = require('body-parser');

var router       = express.Router();
var appRoutes    = require('./app/routes/api')(router);
var path         = require('path');

var passport     = require('passport');
var social       = require('./app/passport/passport')(app,passport);

// var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

// var fs           = require('fs');
// var https        = require('https');

// app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
// https.createServer({}, app).listen(port);
app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

mongoose.connect('mongodb://localhost:27017/mail',function(err){
    if(err){
        console.log('Connection Error ...' + err)
    }else{
        console.log('Connection Success ... :)')
    }
});

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port,function(){
    console.log('Server Started... on port = '+ port);
});