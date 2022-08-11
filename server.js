const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/contact-form", (req, res) => {
  const sendMail = async () => {
    let transporter = nodemailer.createTransport({
      host: "smtp.hostinger.co.uk",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EmailUser,
        pass: process.env.EmailPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const output = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div
      style="
        padding: 10px 0 10px 0;
        max-width: 600px;
        
        background: black;
        text-align: center;
      "
    >
      <img src="https://www.zanshinwebdesign.com/img/weblogo2.jpg" width="150" alt='logo' />
    </div>
    <div style="max-width: 600px; background: white">
      <div style="padding: 10px">
        <h3>Thank you for contacting Zanshin Web Design</h3>
        <p style="text-align: left">
          Dear ${req.body.name},<br /><br />
          Thank you for contacting Zanshin Web Design. We will endeavour to
          respond to you within the next couple of days.
        </p>
        <p>Regards <br/>Simon</p>
      </div>
    </div>
  </body>
</html>  
    `;

    let mailOptions = {
      from: '"Zanshin Web Design" <info@zanshinwebdesign.com>', // sender address
      to: `${req.body.email}; info@zanshinwebdesign.com`,
      subject: "Enquiry",
      text: "Zanshin web design enquiry",
      html: output,
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("form submitted");
      res.redirect("/success.html");
    });
  };
  sendMail();
});

// set static folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
