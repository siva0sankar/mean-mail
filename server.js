var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mail',function(err){
    if(err){
        console.log('Connection Error ...' + err)
    }else{
        console.log('Connection Success ... :)')
    }
});

app.use(morgan('dev'));

app.get('/',function(req,res){
    res.send('Hellow World..');
})

app.get('/home',function(req,res){
    res.send('Hellow Home ..:)')
});

app.listen(port,function(){
    console.log('Server Started... on port = '+ port);
});