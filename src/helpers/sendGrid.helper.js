const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_FROM_SENDGRID,
        pass: process.env.EMAIL_PASSWORD_SENDGRID
    }
});

const sendEmail = async (receiver, source, subject, content) => {
    try {
        const mailOptions = {
            from: '',
            to: receiver,
            subject: subject,
            html: content
        };
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error.message);
        return { success: false, message: error.message };
    }
};

module.exports = {
    sendEmail
}