const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com', // replace with your email
            pass: 'your_app_password',    // generate App Password
        },
    });

    await transporter.sendMail({ from: 'your_email@gmail.com', to, subject, text });
};

module.exports = sendEmail;
