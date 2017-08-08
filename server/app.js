const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressValidator = require('express-validator');
const session = require('express-session');

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

// Express Validator=================================================
// ==================================================================
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// User Registration=================================================
// ==================================================================
app.post('/register', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let memberId = req.body.memberId;
  let password = req.body.password;
  let password2 = req.body.password2;

  // Validation======================================================
  // ================================================================
  

  
    
  User.find({memberId: memberId})
  .then(user => {
    if (user.length > 0) {
      const message = [{msg: 'There is already an account with using that memberId. If problem persists, contact support.'}];
      res.status(400).json(message);
    }
    else {
      console.log('creating user');
      let newUser = new User({
        name: name,
        email: email,
        memberId: memberId,
        password: password,
      });
      User.createUser(newUser, function(err, user) {          
        if (err) {
          throw err;
        } else {
          res.status(200).json(user);
        }          
      });
    }
  });         
});

module.exports = app;