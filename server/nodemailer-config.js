'use strict';
const nodemailer = require('nodemailer');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const transporter = module.exports = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: false,
    auth: {
        user: 'Simcareer.contact@gmail.com',
        pass: process.env.REACT_APP_EMAIL_PASSWORD
    }
});
