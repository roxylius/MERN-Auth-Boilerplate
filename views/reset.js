const express = require('express');
const nodemailer = require('nodemailer');

//user model
const User = require('../schema/user')

//import utility functions
const cryptoHelper = require('../utils/cryptoHelper');
const { generateResetPasswordEmail } = require('../utils/resetPassEmail');

//handles password reset route
const resetRouter = express.Router();

resetRouter.get('/:token', async (req, res) => {
    try {
        // Access the token from the URL
        const resetToken = req.params.token;

        // Decrypt the token to get the reset data
        const resetData = cryptoHelper.decryptData(resetToken);

        // Find the user by email
        const user = await User.findOne({ email: resetData.email });

        // Check if the token has expired
        if (Date.now() > resetData.expireOn) {
            return res.status(400).send('Reset token has expired');
        }

        //check if the password is already reset by check resetToken key in user
        if ( resetToken !== user.resetToken )
            return res.status(400).send("Can't reset password, it has already been reset\nGenerate new Reset Link..");


        // If user is found and token is valid, proceed with password reset logic
        res.status(200).json({message:'Token is valid. Proceed with password reset.',resetData});
    } catch (error) {
        console.log(error);
        res.status(500).send('Invalid or expired token');
    }
})

resetRouter.post('/forgot-password', async (req, res) => {
    try {
        //get user email from ui-client
        const { email } = req.body;

        //find user by email in db
        const user = await User.findOne({ email });

        console.log({email,user})

        //if user not found, send error msg
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        //if user is present
        const resetData = {
            email,
            expireOn: Date.now() + (4 * 60 * 60 * 1000) //4 hours in millsec
        }

        //encrypt resetData and get string output 
        const resetToken = cryptoHelper.encryptData(resetData);

        // Add the resetToken to the user model
        user.resetToken = resetToken;
        await user.save();

        //create reset link
        const resetLink = `${process.env.SERVER_URL}/api/reset/${resetToken}`;

        // Generate the email content using the utility function
        const htmlContent = generateResetPasswordEmail(resetLink, user.name);

        //plain-text version of email for the those that doesn't support html
        const textContent = `hello ${user.name}, your reset link is ${resetLink}`;

        // Send the reset token to the user's email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS,
            },
        });

        //send mail
        const info = await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: '[APPLICATION NAME] Please reset your password',
            text: textContent,
            html: htmlContent
        });

        res.status(200).json({info,message:'Check your email to reset your password.'});

    } catch (err) {
        res.status(500).json({err,message:'Internal Server Error'});
    }

})

module.exports = resetRouter;