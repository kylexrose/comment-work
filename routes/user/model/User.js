const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({//initializes the user format for the database
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    unique: true,//cannot be a duplicate from the database
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
