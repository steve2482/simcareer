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
  let secretAnswer = req.body.secretAnswer;
  let newUser = new User({
    name: name,
    email: email,
    memberId: memberId,
    userName: userName,
    password: password,
    secretAnswer: secretAnswer
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

// Reset Password====================================================
// ==================================================================
app.post('/reset-password', function(req, res) {
  return User.getUserByUsername(req.body.userName, function(err, user) {
    if (!user) {
      const error = 'We\'re sorry, the username you entered is not in our records';
      res.status(400).json(error);
    }
    User.comparePassword(req.body.answer, user.secretAnswer, function(err, isMatch) {
      if (err) {
        throw err;
      }
      if (!isMatch) {
        const error = 'Incorrect answer to secret question'
        res.status(400).json(error);
      }
    });
    User.hashNewPassword(user, req.body.newPassword);
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

// User Logout=======================================================
// ==================================================================
app.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy(function(err) {
    if (err) { return next(err); }
    // The response should indicate that the user is no longer authenticated.
    return res.send({ authenticated: req.isAuthenticated() });
  });   
});

// ==================================================================
// SUPPORT===========================================================
// ==================================================================

// Send Support Email================================================
// ==================================================================
app.post('/contact', function(req, res) {
  let userEmail = req.body.email;
  let mailOptions = {
    from: `${req.body.name} <${userEmail}>`,
    to: 'SimCareer.contact@gmail.com',
    subject: 'Support Ticket',
    html: `<h3>${req.body.name}</h3>
          <h4>${req.body.email}</h4>
          <p>${req.body.message}</p>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(400).json(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.status(200).json('message sent');
  });
})

module.exports = app;