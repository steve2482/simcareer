'use strict';

const app = require('./app');
const { DATABASE_URL, PORT } = require('./config.js');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});