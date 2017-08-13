const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const transporter = require('./nodemailer-config.js');

// Models
const User = require('./models/user.js');

const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(bodyParser.json());

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// ==================================================================
// PASSPORT==========================================================
// ==================================================================

// Express Session===================================================
// ==================================================================
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60 * 60 * 1000
  },
  rolling: true
}));
app.use(passport.initialize());
app.use(passport.session());

// User Registration=================================================
// ==================================================================
app.post('/register', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let memberId = req.body.memberId;
  let userName = req.body.userName;
  let password = req.body.password;
  let password2 = req.body.password2;
  let newUser = new User({
    name: name,
    email: email,
    memberId: memberId,
    userName: userName,
    password: password
  });

  User.createUser(newUser, function(err, user) {          
    if (err) {
      throw err;
    } else {
      res.status(200).json(user);
      let mailOptions = {
        from:'"SimCareer Support" <SimCareer.contact@gmail.com>',
        to: email,
        subject: 'Confirm Registration',
        text: 'Thank you for registering!'
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
      });
    }          
  });       
});

// MemberId Validation During Registration
app.post('/validate-memberId', (req, res) => {
  let memberId = req.body.memberId;
  let idIsValid;

  User.find({memberId: memberId})
  .then(user => {
    if (user.length > 0) {
      idIsValid = false;
      const message = 'There is already an account with using that memberId. If problem persists, contact support.';
      const status = {
        idIsValid: idIsValid,
        message: message
      }
      res.status(200).json(status);
    } else {
      idIsValid = true;
      const status = {
        idIsValid: idIsValid
      }
      res.status(200).json(status)
    }
  });
});

// Login Strategy====================================================
// ==================================================================
passport.use(new LocalStrategy(
  function(userName, password, done) {
    User.getUserByUsername(userName, function(err, user) {
      if (err) {
        throw err;
      }
      if (!user) {
        return done(null, false, {message: 'Unknown user'});
      }
      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) {
          throw err;
        }
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// User Login========================================================
// ==================================================================
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {return next(err);}
    if (!user) {
      const message = info.message
      console.log(message);
      res.status(400).json(message);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      res.status(200).json(req.user);
    });
  })(req, res, next);
});
  

module.exports = app;