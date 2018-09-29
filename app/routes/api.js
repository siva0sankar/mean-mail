var User = require('../models/user');


module.exports = function(router){

    // router.get('/',function(req,res){
    //     res.send('Hellow World..');
    // });

    // router.get('/home',function(req,res){
    //     res.send('Hellow Home ..:)')
    // });

    //http://localhost:8080/user
    router.post('/user',function(req,res){
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
    });

    return router;
}