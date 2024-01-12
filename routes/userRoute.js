//requiring express
const express = require("express");
const user_route = express();

//requiring session
const session = require("express-session");

//requiring config for sessionSecret
const config = require("../config/config");

user_route.use(
  session({
    secret: config.sessionSecret, // Provide your session secret
    resave: false, // Set resave to false to prevent unnecessary session saves
    saveUninitialized: true, // Set saveUninitialized to true to save new but uninitialized sessions
  })
);

// requiring auth
const auth = require("../middleware/auth");

//using or setting view engine 
user_route.set("view engine", "ejs");
user_route.set("views", "./views/users");


//requiring bodyparser
const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

//requiring userController module
const userController = require("../controllers/userController");

//register user method starting
//to invoke loadRegister function from userController module
user_route.get("/register", auth.isLogout, userController.loadRegister);
user_route.post("/register", auth.isLogout, userController.insertUser);


//login user methods starting
user_route.get("/", auth.isLogout, userController.loadLogin);
user_route.get("/login", auth.isLogout, userController.loadLogin);
user_route.post("/login", userController.verifyLogin);


//home page methods
user_route.get("/home", auth.isLogin, userController.loadHome);

//logout method
user_route.get("/logout", userController.userLogout);

//edit method
user_route
  .route("/edit")
  .get(userController.editProfile)
  .post(auth.isLogin, userController.updateProfile);

//update methods
user_route.post("/edit", userController.updateProfile);

module.exports = user_route;
