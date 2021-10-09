const nodemailer = require('nodemailer');

require('dotenv').config();

// /api/sendemail
export default function handler(req, res) {
  const email = req.body.email;
  const imageURL = req.body.imageURL;
  const title = req.body.title;
  const message = req.body.message;
  const greetingId = req.body.greetingId;

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
    subject: 'Greeting NFT Airdrop',
    html: `
      <h1>Claim Greeting NFT: <a href="http://localhost:3000/claimnft/${greetingId}">Link</a></h1>
      <h2>${title}</h2>
      <img src=${imageURL} alt="Greeting" style="width: 100%"/>
      <p>${message}</p>
    `
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