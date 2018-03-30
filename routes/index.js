var path = require("path");
var CONFIG = require('../config/config.js');
var jwt = require('jsonwebtoken');

function ensureAuthorized(req, res, next) {
    console.log("ssssssssssssss",req.headers);
    var token = req.headers.authorization;
    if (token) {
        jwt.verify(token, CONFIG.SECRET_KEY, function (err, decoded) {
            if (err) {
                res.send('Unauthorized Access');
            } else {
                next();
            }
        });
    } else {
        res.send('Unauthorized Access');
    }
}


module.exports = function (app,passport){

    require('./auth.js')(passport);

    app.get("*",function(req,res){
        console.log("ddddddd");
        res.sendFile(path.join(__dirname,'../app/index.html'));
    })

    app.post('/login', passport.authenticate('loginuser', {
        successRedirect: '/success',
        failureRedirect: '/fails',
        failureFlash: true
    }));

    app.post('/register', passport.authenticate('registeruser', {
        successRedirect: '/success',
        failureRedirect: '/fails',
        failureFlash: true
    }));
    
    app.get('/success',function(req,res){
        console.log("req.session--->>",req.session);
        res.cookie('userdata', req.session.passport.user,{ expires: new Date(Date.now() + 90000), httpOnly: true });
        res.send({ user: req.session.passport.user.users.username, token: req.session.passport.user.token });
    })

    app.get('/getUsers',ensureAuthorized,function(req,res){
        res.send({"data":"success users"});
    });

    app.get('/UsersList',ensureAuthorized,function(req,res){
        res.send({"data":"UsersList users"});
    });

    app.get('/logout',function(req,res){
        req.session.destroy();
        res.send({ "msg":"logout successfully"});

    });

    app.get("/fails",function(req,res){
        res.cookie('userdata', 'wrong');
        res.send(req.session.flash.error);
    })


    var user =require("../controller/user.js")();

    app.get("/getUserList",user.getUserList);
    app.post("/addUser",user.addUser)
    app.post("/getuserDoc",user.getuserDoc);
    app.post("/editUser",user.editUser);

}