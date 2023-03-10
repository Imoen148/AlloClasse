const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        
        // ----------- FOR GMAIL | SHOULD NOT BE USE FOR REAL PROD APP--------------
        // service: 'Gmail',
        // auth: {
        //     user: process.env.EMAIL_USERNAME,
        //     password: process.env.EMAIL_PASSWORD,
        // }
        // Activate in gmail 'less secure app' option
        // ----------------------------------------------------------------------

        // -------------- FOR MAILTRAP | EMAIL TESTER FOR DEV --------------------
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        }
        // ------------------------------------------------------------------------
    });

    // 2) Define the email options
    const mailOptions = {
        from: 'Stephanie Ste-Marie <admin@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: 
    }

    // 3) Send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;