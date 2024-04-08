var express = require('express');
const passport = require('passport');
var router = express.Router();
const userModel = require('./users');

const localStrategy = require("passport-local")
passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// profile page
router.get("/profile", isLoggedIn, function(req, res){
  res.render('profile')
})
// login page
router.get("/login", function(req, res){
  res.render('login')
})
// feed page
router.get("/feed", function(req, res){
  res.render('feed')
})  
// register
router.post('/register', function (req, res) {
  const userData = new userModel({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
  });

  userModel.register(userData, req.body.password)
    .then(() => {
      passport.authenticate("local")(req, res, function() {
        res.redirect('/profile');
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error registering user');
    });
});
// login
router.post('/login', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: '/login'
}));

// logout
router.get('/logout', function(req, res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})
// isloggedin
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next()
  res.redirect("/login")
}
module.exports = router;
