var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var USERS_SCHEMA = {};
USERS_SCHEMA.USER = {
    username: { type: String, lowercase: true, index: { unique: true }, trim: true },
    email: { type: String, lowercase: true, index: { unique: true }, trim: true },
    password: String
}

module.exports = USERS_SCHEMA;