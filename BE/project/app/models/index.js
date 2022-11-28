const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./userModel");
db.role = require("./roleModel");
db.refreshToken = require("./refreshTokenModel");
db.milestone = require("./milestoneModel");

db.ROLES = ["freelance", "customer", "admin"];

module.exports = db;
