var bcrypt = require('bcrypt-nodejs');
var db = require('../controller/adaptor/mongodb.js');

module.exports = function(){

    var router = {};

    router.getUserList = function(req,res){

        
        db.GetDocument("users",{},{},{},function(err,result){

            console.log("checking...",err,result);
            if(err){
                res.send(err);
            }

            res.send(result);
        });
    }

    router.addUser = function(req,res){
        
        req.checkBody('email', 'Invalid Email').isEmail();
        req.checkBody('email', 'fill email').notEmpty();
        req.checkBody('username', 'fill username').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {
            res.send(errors);
            return;
        }

        
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
        console.log("add user",req.body);
        
        db.InsertDocument("users",req.body,function(err,result){
            console.log("checking...",err,result);
            if(err){
                res.send(err);
            }

            res.send(result);
        })

        
    }

    router.getuserDoc = function(req,res){
        db.GetOneDocument("users",{ "username":req.body.username},{},{},function(err,result){
            console.log("checking...",err,result);
            if(err){
                res.send(err);
            }

            res.send(result);
        });
    }

    router.editUser = function(req,res){
        req.checkBody('email', 'Invalid Email').isEmail();
        req.checkBody('email', 'fill email').notEmpty();
        req.checkBody('username', 'fill username').notEmpty();
        
        var errors = req.validationErrors();
        if (errors) {
            res.send(errors);
            return;
        }


        if(req.body.password_confirm){
            req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
        }else{
            delete req.body.password;    
        }

        
        
        console.log("add user",req.body);
        
        db.UpdateDocument("users",{ "username":req.body.username },req.body,{multi: true },function(err,result){
            console.log("checking...",err,result);
            if(err){
                res.send(err);
            }

            res.send(result);
        })


    }



    return router;
}