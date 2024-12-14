const express = require('express');
const User = require('../schema/user')

//handles password reset route
const resetRouter = express.Router();


resetRouter.post('/link', async (req, res) => {

    try {
        //get user email from ui-client
        const { email } = req.body;

        //find user by email in db
        const user = await User.findOne({mail: email});

        //if user not found, send error msg
        if(!user){
            return res.status(404).send({message: "User not found!"});
        }

    } catch (err) {

    }

})

module.exports = resetRouter;