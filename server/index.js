'use strict';

const app = require('./app');
const { DATABASE_URL, PORT } = require('./config.js');

// ==============================================================
// MONGOOSE SETUP================================================
// ==============================================================

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Start Server==================================================

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}!`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// Close Server==================================================

function closeServer() {
  return mongoose.disconnect()
  .then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server!');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
