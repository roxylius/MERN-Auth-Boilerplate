const express = require('express');
const nodemailer = require('nodemailer');

//user model
const User = require('../schema/user')
const cryptoHelper = require('../utils/cryptoHelper');

//handles password reset route
const resetRouter = express.Router();

resetRouter.put('/:token', async (req, res) => {

})

resetRouter.post('/forgot-password', async (req, res) => {

    try {
        //get user email from ui-client
        const { email } = req.body;

        //find user by email in db
        const user = await User.findOne({ mail: email });

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
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        });

        res.json(info);

    } catch (err) {

    }

})

module.exports = resetRouter;