sequelize = require("./db");
bcrypt = require("bcrypt");

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
User.authenticate = function(username, password, err, success) {

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
        err({message: "Oops! Something went wrong"});
      }
      else if (user === null){
        err({message: "Username does not exist"});
      }
      else if ((User.comparePass(password, user.password)) === true){
        success();
      }
      else {
        err({message: "Invalid password"});
      }
    });
};

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