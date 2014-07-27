var express = require("express"),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  passportLocal = require("passport-local"),
  cookieParser = require("cookie-parser"),
  cookieSession = require("cookie-session"),
  User = require("./config/user"),
  app = express();

// Middleware for ejs, grabbing HTML and including static files
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}) ); 
app.use(express.static(__dirname + '/public'));

// store our session data in a cookie - this can be done either 
app.use(cookieSession( {
  secret: process.env.SESSION_SECRET || 'secret', 
  resave: false, 
  saveUninitialized: false
  })
);

// get passport started
app.use(passport.initialize());
app.use(passport.session());

// prepare our serialize functions
passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.find({
      where: {
        id: id
      }
    })
    .done(function(error,user){ 
      done(error, user);
    });
});

app.get('/', function(req,res){
  // check if the user is logged in
	if(!req.user) {
    res.render("index", {message: null});
  }
  else{
    res.render("home", {
    isAuthenticated: req.isAuthenticated(),
    user: req.user
  });
  }
});

app.get('/signup', function(req,res){
  res.render("signup", {message: null, username: ""});
});

app.get('/login', function(req,res){
  res.render("login", {message: null});
});

app.get('/home', function(req,res){
  res.render("home", {
  isAuthenticated: req.isAuthenticated(),
  user: req.user
  });
});
// on submit, create a new users using form values
app.post('/submit', function(req,res){	
  

  User.createNewUser(req.body.username, req.body.password, 
  function(err){
    res.render("signup", {message: err.message, username: req.body.username});
  }, 
  function(success){
    res.render("index", {message: success.message});
  });
});

// authenticate users when logging in
app.post('/login', passport.authenticate('local'), function(req,res){

  User.authenticate(req.body.username, req.body.password, 
  function(err){ 
    res.render("login", {message: err.message});
  }, 
  function(success){
    res.redirect("home");
  });
});

app.get('/logout', function(req,res){
  //req.logout added by passport - delete the user id/session
  req.logout();
  res.redirect('/');
});

// catch-all for 404 errors 
app.get('*', function(req,res){
  res.status(404);
  res.render('404');
});

app.listen(3000, function(){
  console.log("get this party started on port 3000");  
});
