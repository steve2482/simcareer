const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const transporter = require('./nodemailer-config.js');
let request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

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
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let newUser = new User({
    name: name,
    email: email,
    memberId: memberId,
    userName: userName,
    password: password,
    secretAnswer: secretAnswer,
    dateJoined: year + '-' + month + '-' + day,
    seasonNumber: 1
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
});

// Update User Dicipline Selection===================================
// ==================================================================
app.put('/dicipline-selection', function(req, res) {
  let userName = req.body.user;
  let dicipline = req.body.dicipline;
  return User.findOneAndUpdate(
    {userName: userName},
    {$set: 
      {
        path: dicipline,
        tier: 1
      }
    },
    {upsert: true, new: true},
    function(err, doc) {
      if (err) {
        console.log('Path Selection failed');
      }
      console.log(doc);
      res.status(200).json(doc);
    }
  );
});

// Update User Contract Selection====================================
// ==================================================================
app.put('/contract-selection', function(req, res) {
  console.log(req.body);
  let userName = req.body.user;
  let car = req.body.car;
  let carId = req.body.carId;
  let series = req.body.series;
  let seriesId = req.body.seriesId;
  return User.findOneAndUpdate(
    {userName: userName},
    {$set:
      {
        currentCar: car,
        currentCarId: carId,
        currentSeries: series,
        currentSeriesId: seriesId
      }
    },
    {upsert: true, new: true},
    function(err, doc) {
      if (err) {
        console.log('Contract selection failed');
      }
      res.status(200).json(doc);
    }
  );
});

// ==================================================================
// Get Race Results==================================================
// ==================================================================

const steward = require('./points-structure.js');

let username = process.env.REACT_APP_IRACING_USERNAME;
let password = process.env.REACT_APP_IRACING_PASSWORD;

let loginUrl = 'https://members.iracing.com/membersite/Login'

let jar = request.jar();
request = request.defaults({jar:jar});

// Find all users
User.find()
.then(users => {
  // For each user, login to iracing
  users.forEach(user => {
    request({
      uri: loginUrl,
      method: 'POST',
      form: {
        username: username,
        password: password
      },
      jar: jar
    }, 
    function() {
      // Get users last 10 races
      let userStatsUrl = `http://members.iracing.com/memberstats/member/GetLastRacesStats?custid=${user.memberId}`;
      request({
        uri: userStatsUrl,
        method: 'GET',
        jar: jar
      }, 
      function(err, res, body) {
        let races = JSON.parse(body);
        races = races.reverse();
        // Check if user's last 10 races are of the user's current series, current car, after the date joined and the session id has not been entered already
        for (i =0; i < races.length; i++) {
          if (races[i].seriesID === user.currentSeriesId && races[i].carID === user.currentCarId && races[i].date <= user.dateJoined && (user.sessionIds === undefined || user.sessionIds.includes(races[i].subsessionID) === false)) {
            console.log(true);
            // Request session results
            let resultsUrl = `http://members.iracing.com/membersite/member/GetSubsessionResults?subsessionID=${races[i].subsessionID}&custid=${user.memberId}`;
            request({
              uri: resultsUrl,
              method: 'GET',
              jar: jar
            }, 
            function(err, res, body) {
              let raceResult = JSON.parse(body);
              // If session was unofficial or is the same track as last race result(to keep users from running multiple races on tracks they are dominate) do nothing
              if (raceResult.rows[0].officialsession != 1 || raceResult.track_name === user.lastTrack) {
                return
              } else {
                // Grab session Id and add to users sessionIds
                let sessionId = raceResult.subsessionid;
                // Grab Track info and update users lastTrack
                let trackName = raceResult.track_name;
                User.findOneAndUpdate(
                  {userName: user.userName},
                  {$push: {sessionIds: sessionId}},
                  {upsert: true, new: true},
                  function(err) {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
                User.findOneAndUpdate(
                  {userName: user.userName},
                  {$set: {lastTrack: trackName}},
                  {upsert: true, new: true},
                  function(err) {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
                // Create array of race rows
                let results = [];
                for (row = 0; row < raceResult.rows.length; row++) {
                  if (raceResult.rows[row].simsestypename === 'Race') {
                    results.push(raceResult.rows[row]);
                  }
                }
                // Grab User result
                let userInfo = results[(results.findIndex(function(driver) {
                  return driver.custid === user.memberId;
                }))];
                let finalResult = [];
                let userResult = {
                  name: user.name,
                  startPos: userInfo.startpos + 1,
                  finishPos: userInfo.finishposinclass + 1,
                  resultLink: `http://members.iracing.com/membersite/member/EventResult.do?&subsessionid=${sessionId}&custid=${user.memberId}`
                };
                finalResult.push(userResult);
                // Remove user and drivers not in same class as user from results array
                let resultsNoUser = results.filter(function(driver) {
                  return driver.custid != user.memberId && driver.carid === user.currentCarId;
                });
                // Order drivers by irating
                resultsNoUser = resultsNoUser.sort(function(a, b) {
                  return b.oldirating - a.oldirating;
                });
                // Grab result all racers in class of user
                for (d = 0; d < resultsNoUser.length; d++) {
                  let driver = {
                    name: 'Driver #' + (d + 1),
                    startPos: resultsNoUser[d].startpos + 1,
                    finishPos: resultsNoUser[d].finishposinclass + 1,
                  }
                  finalResult.push(driver);
                }
                finalResult = steward.assignPoints(finalResult, user.currentSeriesId);                  
                // Save results
                User.findOneAndUpdate(
                  {userName: user.userName},
                  {$push: {seasonResults: finalResult}},
                  {upsert: true, new: true},
                  function(err) {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
                // Determine points standings
                User.findOne({userName: user.userName})
                .then(user => {
                  // Find largest field
                  let lengths = user.seasonResults.map(function(a){return a.length;});
                  let largestFieldIndex = lengths.indexOf(Math.max.apply(Math, lengths));
                  let largestField = user.seasonResults[largestFieldIndex];
                  // Create an empty set of standings
                  let newSeasonStaindings = [];
                  // Push each driver name into new standings
                  for (let i = 0; i < largestField.length; i++) {
                    let eachDriver = {
                      name: largestField[i].name,
                      totalPoints: '',
                      averageStart: '',
                      averageFinish: ''
                    }
                    newSeasonStaindings.push(eachDriver);
                  }
                  // Total the points for each driver
                  for (let i = 0; i < newSeasonStaindings.length; i++) {
                    let currentDriver = newSeasonStaindings[i];
                    let pointTotal = 0;
                    for (let x = 0; x < user.seasonResults.length; x++) {
                      let eachRaceResult = user.seasonResults[x];
                      for (let y = 0; y < eachRaceResult.length; y++) {
                        if (currentDriver.name === eachRaceResult[y].name) {
                          pointTotal = pointTotal + eachRaceResult[y].points;
                        }
                      }
                    }
                    currentDriver.totalPoints = pointTotal;
                  }
                  return newSeasonStaindings;
                })
                .then(standings => {
                  // Save the updated standings to user
                  User.findOneAndUpdate(
                    {userName: user.userName},
                    {$set: {seasonStandings: standings}},
                    {upsert: true, new: true},
                    function(err) {
                      if (err) {
                        console.log(err);
                      }
                    }
                  );
                });
              }
            });
          } else {
            console.log(false);
            // Do nothing         
          }
        }
      });
    });
  });
});



  
  


module.exports = app;