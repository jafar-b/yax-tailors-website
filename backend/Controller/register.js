const validateEmail = require("../utility/emailValidate");
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("../Configs/config")



const register = async (req, res) => {

    var email = req.body.email;
    var pass = req.body.pass;
    var retype_pass = req.body.retype_pass;
    var name = req.body.name;


    /* Check email enterred or not */
    if (!email) {
        return res.status(400).send(JSON.stringify({ "message": "Email is Required", "status": 400 }));

    }

    /* Check password is enterred or not */
    if (!pass) {
        return res.status(400).send(JSON.stringify({ "message": "Password is Required", "status": 400 }));

    }

    /* Check retype_pass */
    if (!retype_pass) {
        return res.status(400).send(JSON.stringify({ "message": "Retype Password  Required", "status": 400 }));

    }


    /* check name */
    if (!name) {
        return res.status(400).send(JSON.stringify({ "message": "Name is Required", "status": 400 }));

    }

    // Validate Email format
    if (validateEmail(email) == true) {

        if (pass != retype_pass) {

            return res.status(401).send({ "message": "password does not match", "status": 401 });
        } else {

            // If both password matches

            // Checking already exist or not
            const exists = await User.exists({ email: email });

            /* User Already exists msg */
            if (exists) {
                return res.status(403).send({ "message": "User already have account" });
            } else {

                /* IF user not exists */
                // The store user data to the database

                // Generate salt for password
                bcrypt.genSalt(10, function (err, salt) {

                    if (err) {
                        return res.status(401).send({ "message": "Something went wrong while register new user" });
                    }

                    // encrypt password using salt

                    bcrypt.hash(pass, salt, function (err, hash) {
                        if (err) {
                            return res.status(401).send({ "message": "Something went wrong while register new user" });
                        }


                        const newUser = new User({
                            email: email,
                            password: hash,
                            name: name
                        });

                        // generate acess token
                        const token = jwt.sign(
                            {
                                user_id: newUser._id
                            },
                            process.env.SECRET_KEY,
                            {
                                expiresIn: Math.floor(Date.now() / 1000) + (60 * 60),
                                algorithm: 'HS512'
                            }
                        );

                        newUser.token = token;

                        // save use to database
                        newUser.save();

                        // save cookie to browser
                        let options = {
                            path: "/",
                            sameSite: true,
                            maxAge: 1000 * 60 * 60 * 24 * 30, // would expire after 30 days
                            httpOnly: true,
                        }

                        res.cookie('token_id', token, options);
                        return res.status(200).send({ "message": "account created successfully", "status": 200, "token": token, "email": email, "userId": newUser._id });

                    });


                });
            }

        }

    } else {
        return res.status(400).send({ "message": "Invalid Email" });
    }


}

module.exports = register;