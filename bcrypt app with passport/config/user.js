var sequelize = require("./db"),
    bcrypt = require("bcrypt"),
    passport = require("passport"),
    flash = require('connect-flash'),
    passportLocal = require("passport-local");

var salt = bcrypt.genSaltSync(10);

// define our User model
var User = sequelize.define('User', {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    username: { type: Sequelize.STRING, unique: true, allowNull: false, validate: {
        len: [6, 30]}},
    password: { type: Sequelize.STRING}
      });

// create our User table
User.sync().success(function() {
  console.log("User table created if it didn't previously exist");
}).error(function(err) {
  console.log("Error creating user table - " + err);
}); 

// encrypt passwords
User.encryptPass = function(password) {
    var hash = bcrypt.hashSync(password, salt);
    return hash;
};

// compare user to DB passwords
User.comparePass = function(userpass, dbpass) {
	// don't salt twice when you compare....watch out for this
	return bcrypt.compareSync((userpass), dbpass);
};

// authenticate our users
passport.use(new passportLocal.Strategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback : true
},

function(req, username, password, done) {

  // find a user in the DB
	User.find({
      where: {
        username: username
      }
    })
    // when that's done, 
    .done(function(error,user){
      if(error){
        console.log(error);
        return done (null, false, req.flash('loginMessage', 'Oops! Something went wrong.'));
      }
      if (!user){
        return done (null, false, req.flash('loginMessage', 'Username does not exist.'));
      }
      if ((User.comparePass(password, user.password)) !== true){
        return done (null, false, req.flash('loginMessage', 'Invalid Password'));
      }
      return done(null, user); 
    });
}));


// create a new user with some plain text password validation
User.createNewUser = function(username, password, err, success ) {
	if(password.length < 6) {
		err({message: "Password should be more than six characters"});
	}
	else{
  User.create({
      username: username,
      password: User.encryptPass(password)
    }).error(function(error) {
      if(error.username){
        err({message: 'Your username should be at least 6 characters long', username: username});
      }
      else{
        err({message: 'An account with that username already exists', username: username});
        }
		}).success(function(user) {
      success({message: 'Account created, please log in now'});
    });
	}
};


module.exports = User;