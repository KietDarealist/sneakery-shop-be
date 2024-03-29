import nodemailer from "nodemailer";

const sendOTPThroughMail = (to, subject, text) => {
  // Thông tin tài khoản email gửi
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ADDRESS, // Thay bằng địa chỉ email của bạn
      pass: process.env.MAIL_PASSWORD, // Thay bằng mật khẩu của bạn
    },
  });

  // Thông tin email
  const mailOptions = {
    from: "kiet.huynh@fdssoft.com", // Thay bằng địa chỉ email của bạn
    to: to,
    subject: subject,
    text: text,
  };

  // Gửi email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const generateOTP = (): string => {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits.charAt(randomIndex);
  }

  return otp;
};

export { sendOTPThroughMail, generateOTP };
