var express = require('express');
const passport = require('passport');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./posts');
const upload =  require("./multer")

const localStrategy = require("passport-local")
passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// profile page
router.get("/profile", isLoggedIn, async function(req, res){
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
  .populate("posts")
  res.render('profile', {user})
})
// login page
router.get("/login", function(req, res){
  res.render('login', {error: req.flash('error')})
})
// feed page
router.get("/feed", function(req, res){
  res.render('feed')
})  
// upload GET
router.get("/upload", (req, res) => {
  res.render("upload");
});
// upload POST
router.post("/upload",isLoggedIn, upload.single("file"), async function(req, res){
  if(!req.file){
    return res.status(400).send("no files were given")
  }
  // res.send('file uploaded seccessfully')
  res.redirect("/profile")
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
  const post = await postModel.create({
    image: req.file.filename,
    caption: req.body.caption,
    user: user._id
  })

  user.posts.push(post._id);
  await user.save();
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
  failureRedirect: '/login',
  failureFlash: true
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
