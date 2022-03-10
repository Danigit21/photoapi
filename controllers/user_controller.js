// User controller

const debug = require('debug')('photoapi:user_controller');
const { matchedData, validationResult } = require('express-validator');
const models = require('../models');
const bcrypt = require('bcrypt');

// Register a new user
// POST /register
const register = async(req, res) => {
    // check for validation errors
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    // get only validated data
    const validData = matchedData(req);
    
    console.log("The validated data:", validData);

    // generate a hash of validData.password and overwrite validData.password with the generated hash
    try {
        validData.password = await bcrypt.hash(validData.password, 10);

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception from when trying to hash the password.',
        });

        throw error;
    }

    try {
        const user = await new models.User(validData).save();
        debug("Created new user successfully: %O", user);

        res.send({
            status: 'success',
            data: {
                email: validData.email,
                first_name: validData.first_name,
                last_name: validData.last_name
                // use user to show all data in user, including password
            },
        });

    } catch (error) {
        res.status(500).send({
            status: 'error',
            message: 'Exception thrown in database when trying to create a new user.',
        });

        throw error;
    }
}


// Login a user with the example
// "username": "",
// "password": ""

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // try to log in the user through email and password
    const user = await models.User.login(email, password);
    
    if (!user) {
        return res.status(401).send({
            status: "fail",
            data: "Failed to log in.",
        });
    }

    return res.status(200).send({
        status: 'success',
        data: user
    });
};

module.exports = {
    register,
    login
};