//configures the .env file
require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app");

const port = 3000;

mongoose//starts database
  .connect(process.env.MONGO_DB, { //pulls variable from the .env file
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => { //starts server and logs a success statement
      console.log(`Server connected on ${port}`);
      console.log("MongoDB Connected");
    });
  })
  .catch((e) => {
    console.log(e);//logs errors
  });
