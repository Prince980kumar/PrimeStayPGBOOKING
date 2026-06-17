const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Check if EMAIL_USER and EMAIL_PASS are configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('--- Nodemailer: Email credentials (EMAIL_USER / EMAIL_PASS) not configured in .env. Logging email details: ---');
    console.log('To:', options.to);
    console.log('Subject:', options.subject);
    console.log('Message:', options.text);
    console.log('---------------------------------------------------------------------------------------------------------------');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    const mailOptions = {
      from: `"Prime Stay LPU" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email via nodemailer:', error);
    throw error;
  }
};

module.exports = sendEmail;
