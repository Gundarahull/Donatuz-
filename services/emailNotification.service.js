const nodeMailer = require("nodemailer");

const sentMail = async (request) => {
  try {
    const transport = nodeMailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "shaikrahul1105@gmail.com",
      to: request.email,
      subject:
        request.emailType === "Verify"
          ? "Registration Success"
          : "File Uploaded Successfully",
      html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #4CAF50; text-align: center;">${
              request.emailType === "Verify"
                ? "Registration Successful!"
                : "File Uploaded Successfully"
            }</h2>
            <p style="font-size: 16px; line-height: 1.6;">
              ${
                request.emailType === "Verify"
                  ? "Thank you for registering with us! We're excited to have you onboard."
                  : "Your file has been uploaded successfully and is now available in your account."
              }
            </p>
            <p style="font-size: 14px; color: #777;">
              ${
                request.emailType === "Verify"
                  ? "If you have any questions or need assistance, please don't hesitate to reach out to us."
                  : "You can access and manage your uploaded files anytime from your account dashboard."
              }
            </p>
            <p style="margin-top: 20px; font-size: 12px; color: #999; text-align: center;">
              &copy; ${new Date().getFullYear()} F50@Losers Company. All rights reserved.
            </p>
          </div>
        `,
    };

    //Sending the MAIL
    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Email SENT");
    return mailResponse;
  } catch (error) {
    console.error("Error in the Sent Mail", error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong in Sent Mail",
      error: error.message || error,
    });
  }
};

module.exports={
    sentMail
}
