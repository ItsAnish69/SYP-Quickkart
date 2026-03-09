import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user: process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
});

const SendEmail = async(to, subject, text) => {
    // Check if email credentials are configured
    if(!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("⚠️ Email service not configured - missing EMAIL_USER or EMAIL_PASS in .env");
        return { success: false, message: "Email service not configured" };
    }

    const mailOption = {
        from : process.env.EMAIL_USER,
        to,
        subject,
        text
    };

    try{
        const info = await transporter.sendMail(mailOption);
        console.log("✓ Email sent successfully to:", to);
        return { success: true, message: "Email sent successfully", info };
    } catch(err){
        console.error('✗ Error sending email to', to, ':', err.message);
        return { success: false, message: "Failed to send email", error: err.message };
    }
}

export {SendEmail}