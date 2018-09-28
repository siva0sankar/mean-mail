var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('./app/models/user');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/mail',function(err){
    if(err){
        console.log('Connection Error ...' + err)
    }else{
        console.log('Connection Success ... :)')
    }
});

app.get('/',function(req,res){
    res.send('Hellow World..');
})

app.get('/home',function(req,res){
    res.send('Hellow Home ..:)')
});

//http://localhost:8080/user
app.post('/user',function(req,res){
    //  res.send('Testing User..');  -- Just for Testing 

    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    if(req.body.username == null ||req.body.username == '' ||
        req.body.password == null ||req.body.password == '' ||
        req.body.email == null ||req.body.email == '' ){
        res.send("Ensure username,email and password were provided");
    }else{
        user.save(function(err){
            if(err){
                res.send('Username or Email is already created.. :(');
            }else{
                res.send('user created :)');
            }
        });
    }


})

app.listen(port,function(){
    console.log('Server Started... on port = '+ port);
});