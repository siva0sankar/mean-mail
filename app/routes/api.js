var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = 'token_key_for';

module.exports = function(router){

    // router.get('/',function(req,res){
    //     res.send('Hellow World..');
    // });

    // router.get('/home',function(req,res){
    //     res.send('Hellow Home ..:)')
    // });

    // USER REGISTRATION 
    //http://localhost:8080/api/user
    router.post('/user',function(req,res){
        //  res.send('Testing User..');  -- Just for Testing 

        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        if(req.body.username == null ||req.body.username == '' ||
            req.body.password == null ||req.body.password == '' ||
            req.body.email == null ||req.body.email == '' ){
            res.json({success : false , message : 'Ensure username,email and password were provided'})
        }else{
            user.save(function(err){
                if(err){
                    res.json({success : false , message : 'Username or Email is already created.. :('})
                }else{
                    res.json({success:true,message:'user created :)'})
                }
            });
        }
    });


    // USER LOGIN 
    // http://localhost:port/api/authenticate
    router.post('/authenticate',function(req,res){
        User.findOne({username:req.body.username}).select('email username password').exec(function(err,user){
            if(err) throw err;

            if(!user){
                res.json({success:false,message:'Could not authenticate user ..'})
            }else if(user){
                if(req.body.password){
                    var validPassword = user.comparePassword(req.body.password);
                    if(!validPassword){
                        res.json({success:false,message:'Could not authenticate password ..'})
                    }else{
                        var token = jwt.sign({ username: user.username , email : user.email }, secret ,{expiresIn : '24h'} );
                        res.json({success:true,message:'User Authenticated  :)', token : token});
                    }
                }else{
                    res.json({success:false,message:'No Password provided  ..'})
                }
            }
        });
    });


    router.use(function(req,res,next){
        var token = req.body.token || req.body.query || req.headers['x-access-token'];

        if(token){
            jwt.verify(token,secret,function(err,decoded){
                if(err){
                    res.json({success:false , message: 'Token Invalid'})
                }else{
                    req.decoded = decoded;
                    next();
                }
            });
        }else{
            res.json({success:false , message: 'No Token Provided '})
        }

    });

    // to get current user or decode the token 
    router.post('/me',function(req,res){
        res.send(req.decoded);
    });

    return router;
}