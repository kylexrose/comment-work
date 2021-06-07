const bcrypt = require("bcryptjs");
const User = require("../model/User");

const jwt = require("jsonwebtoken");

async function signup(req, res) {//initialize the signup function
  const { username, email, password, firstName, lastName } = req.body; //give  the post data a variable in the scope

  const { errorObj } = res.locals; //pull the error obj from local storage

  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });//throw error if an error is found in locals
  }

  try {
    let salt = await bcrypt.genSalt(12); //generate salt for encryption
    let hashedPassword = await bcrypt.hash(password, salt); //make an encrypted password

    const createdUser = new User({ //initialize a new user
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });

    let savedUser = await createdUser.save(); //save that new user

    res.json({ message: "success", data: savedUser }); //respond with success
  } catch (e) {
    console.log(e);
    console.log(e.message);
    res.json({ message: "error", error: e });//throw a error catch
  }
}

async function login(req, res) {//initialize a login function
  const { email, password } = req.body; //give post data a variable

  const { errorObj } = res.locals; //pull errors from local storage

  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }

  try {
    let foundUser = await User.findOne({ email: email }); //run a search for the email given

    if (!foundUser) { //if its not found, throw message that it is incorrect
      res.status(400).json({
        message: "failure",
        payload: "Please check your email and password",
      });
    } else {
      //if found, check the password given
      let comparedPassword = await bcrypt.compare(password, foundUser.password);

      if (!comparedPassword) {//if no match, throw message
        res.status(400).json({
          message: "failure",
          payload: "Please check your email and password",
        });
      } else {
        let jwtToken = jwt.sign(//if user log in successfully, give a token
          {
            email: foundUser.email,
            username: foundUser.username,
          },
          process.env.PRIVATE_JWT_KEY,//pull the private identifier from the .env file
          {
            expiresIn: "1d",// give the time frame for validity
          }
        );

        res.json({ message: "success", payload: jwtToken });//return the token to the user
      }
    }
  } catch (e) {
    res.json({ message: "error", error: e });
  }
}

module.exports = { signup, login };
