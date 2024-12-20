const express = require('express');
const nodemailer = require('nodemailer');

//user model
const User = require('../schema/user')

//import utility functions
const cryptoHelper = require('../utils/cryptoHelper');
const { generateResetPasswordEmail } = require('../utils/resetPassEmail');
const { generateResetForm } = require('../utils/resetPassForm');

//handles password reset route
const resetRouter = express.Router();

resetRouter.post('/forgot-password', async (req, res) => {
    try {
        //get user email from ui-client
        const { email } = req.body;

        //find user by email in db
        const user = await User.findOne({ email });

        console.log({ email, user })

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

        res.status(200).json({ info, message: 'Check your email to reset your password.' });

    } catch (err) {
        res.status(500).json({ err, message: 'Internal Server Error' });
    }

})

resetRouter.get('/:token', async (req, res) => {
    try {
        // Access the token from the URL is decoded in href
        const resetToken = req.params.token;

        // Decrypt the token to get the reset data
        const resetData = cryptoHelper.decryptData(resetToken);

        // Find the user by email
        const user = await User.findOne({ email: resetData.email });

        // Check if the token has expired
        if (Date.now() > resetData.expireOn) {
            return res.status(400).send('Reset Link has expired. Generate a new Link!');
        }

        //check if the password is already reset by check resetToken key in user
        //decode user.resetToken as resetToken is already decoded by browser when the url was accessed from href 
        if (resetToken !== decodeURIComponent(user.resetToken))
            return res.status(400).send("Can't reset password, it has already been reset\nGenerate new Reset Link..");

        // If user is found and token is valid,Serve the password reset form
        const resetFormHtml = generateResetForm(encodeURIComponent(resetToken));
        res.send(resetFormHtml);

    } catch (error) {
        console.log(error);
        res.status(500).send('Invalid or expired token');
    }
})


resetRouter.post('/:token', async (req, res) => {
    try {
        const resetToken = req.params.token;
        const resetData = cryptoHelper.decryptData(resetToken);

        // Find the user by email
        const user = await User.findOne({ email: resetData.email });

        const { password, confirmPassword } = req.body;

        // Validate passwords
        if (password !== confirmPassword) {
            return res.status(400).send("Passwords do not match.");
        }

        if (password.length < 8) {
            return res.status(400).send("Password must be at least 8 characters long.");
        }

        // Update the password using passport-local-mongoose
        await user.setPassword(password);

        // Clear the resetToken after successful password reset
        user.resetToken = undefined;
        await user.save();

        res.status(200).send("Password has been successfully reset. Login in with new Password!");

    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while resetting the password.');
    }
});

module.exports = resetRouter;