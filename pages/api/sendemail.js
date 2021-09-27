const nodemailer = require('nodemailer');

require('dotenv').config();

// /api/sendemail
export default function handler(req, res) {
  const email = req.body.email;
  console.log(email);

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.YOUREMAIL,
      pass: process.env.YOUREMAILPASSWORD
    }
  });

  var mailOptions = {
    from: process.env.YOUREMAIL,
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'It works'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return res.status(500).json({ error });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({ msg: 'Email sent: ' + info.response });
    }
  });
}