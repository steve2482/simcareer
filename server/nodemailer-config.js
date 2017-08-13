'use strict';
const nodemailer = require('nodemailer');

const transporter = module.exports = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: false,
    auth: {
        user: 'Simcareer.contact@gmail.com',
        pass: REACT_APP_EMAIL_PASSWORD
    }
});
