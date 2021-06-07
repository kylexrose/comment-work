
//Pull in the packages from express and morgan
const express = require("express");
const logger = require("morgan"); 

//start an express app
const app = express();

//create a path to the user folder
const userRouter = require("./routes/user/userRouter");

//log the dev tools in the console
app.use(logger("dev"));

//utilize json responses
app.use(express.json());

//parsing form data/incoming data
//specifying what type of post data is used
app.use(express.urlencoded({ extended: false }));

//route the url with /api/user to the userRouter file in the user folder
app.use("/api/user", userRouter);

module.exports = app;
