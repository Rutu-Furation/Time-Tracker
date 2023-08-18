const nodeMailer = require('nodemailer');

export const sendEmail = async (options: any) => {

    const randomOtp = 1234
    var transporter = nodeMailer.createTransport({
        service: 'gmail',
      auth: {
        user: 'rutuja.dhekolkar@furation.tech',
        pass: 'svopfskoqniqnlwj'
      }
      });
    const mailOptions = {
        // from: process.env.SMPT_MAIL,
        // to: options.email,
        // subject: options.subject,
        // text: options.message,\\
        from: 'rutuja.dhekolkar@furation.tech',
      to: options.email,
      subject: 'Invitation to Join Furation Tech Solutions WorkSpace',
        text: options.message,
        Your_Otp: randomOtp
    }
    await transporter.sendMail(mailOptions);
}









