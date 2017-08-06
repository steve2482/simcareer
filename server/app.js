const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// ===================================================================
// MONGOOSE SETUP=====================================================
// ===================================================================

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const User = require('./models/user.js');


module.exports = app;