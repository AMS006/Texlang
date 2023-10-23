const nodemailer = require("nodemailer");

async function sendEmail(email,html) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });
  try {
    const options = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject:"Security code for login process",
      html
    };
    await transporter.sendMail(options);
  } catch (error) {
    console.log("Email Error : ", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = sendEmail;