const express = require('express');
const nodemailer = require('nodemailer');

//user model
const User = require('../schema/user')

//import utility functions
const cryptoHelper = require('../utils/cryptoHelper');
const { generateResetPasswordEmail } = require('../utils/emailTemplate');

//handles password reset route
const resetRouter = express.Router();

resetRouter.get('/:token', async (req, res) => {

})

resetRouter.post('/forgot-password', async (req, res) => {
    console.log("in /forgot-password");
    try {
        //get user email from ui-client
        const { email } = req.body;

        //find user by email in db
        const user = await User.findOne({ email });

        //if user not found, send error msg
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }

        //if user is present
        const resetData = {
            email,
            expireOn: Date.now() + (4 * 60 * 60 * 1000) //4 hours in millsec
        }

        //encrypt resetData and get string output 
        const resetToken = cryptoHelper.encryptData(resetData);

        //create reset link
        const resetLink = `${process.env.SERVER_URL}/api/reset/${resetToken}`;

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
            text: 'That was easy!'
        });

        res.json(info);

    } catch (err) {
        res.status(500).json({err});
    }

})

module.exports = resetRouter;