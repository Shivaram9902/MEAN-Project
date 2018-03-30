var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

/*---new db schema----*/
var config_user_schema = require('../schema/user_schema.js');

var userSchema = mongoose.Schema(config_user_schema.USER, { timestamps: true, versionKey: false });

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

var users = mongoose.model('users', userSchema, 'users'); //users schema is pointing to users collection in mongodb

module.exports = {
    'users': users
}