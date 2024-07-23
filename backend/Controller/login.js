const User = require("../Models/user");
const validateEmail = require("../utility/emailValidate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async (req, res, next) => {
    var email = req.body.email;
    var pass = req.body.pass;

    /* Check email entered or not */
    if (!email) {

        return res.status(404).send({ "message": "Email is Required", "status": 400 });

    }

    /* Check password is enterred or not */
    if (!pass) {
        return res.status(404).send({ "message": "Password is Required", "status": 404 });
    }

    if (validateEmail(email)) {

        User.findOne({ email: email }, (err, user) => {

            if (err) {
                return res.status(400).send({ "message": "Something went wrong while fetching user" });
            }
            if (!user) {
                return res.status(404).send({ "message": "User not found" });
            }

            bcrypt.compare(pass, user.password, (err, response) => {
                if (err) {
                    return res.status(400).send({ "message": "Something went wrong while fetching user" });
                }
                if (!response) {
                    return res.status(400).send({ "message": "Password does not match" });
                }

                // Create token
                const token = jwt.sign(
                    {
                        user_id: user._id
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
                    }
                );

                // save new user token
                User.findOneAndUpdate({ _id: user._id }, {
                    token: token
                },
                    { new: true }
                ).exec();

                let options = {
                    path: "/",
                    sameSite: true,
                    maxAge:  60 * 60 * 24 * 30, // would expire after 30 days
                    httpOnly: true,
                }

                // store cookie
                res.cookie('token_id', token, options);

                // return the response
                res.status(200).send({ "message": "Login Successful", "token": token, "email": email, "userId": user._id, status: 200 });

            })
        });
    } else {
        return res.status(400).send({ "message": "Invalid Email" });
    }

}
module.exports = Login;