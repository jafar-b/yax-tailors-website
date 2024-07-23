// Update Password API controller
const bcrypt = require("bcrypt");
const User = require("../../Models/user");

const updatePassword = (req, res) => {

    // check user is logged in 
    if (!req.user) {
        return res.status(400).send({ "message": "You are not logged In ! , Please Login" })
    }

    const { oldPass, newPass } = req.body;

    if (!oldPass || oldPass === undefined) {
        return res.status(400).send({ "message": "Please Enter Old Password " })

    }

    if (!newPass || newPass === undefined) {
        return res.status(400).send({ "message": "Please Enter New Password " })

    }

    // Verify old password with server stored password
    User.findOne({ _id: req.user }, (err, user) => {

        if (err) {
            return res.status(400).send({ "message": "Something went wrong while fetching user" });
        }
        if (!user) {
            return res.status(404).send({ "message": "Invalid User" });
        }


        bcrypt.compare(oldPass, user.password, (err, response) => {
            if (err) {
                return res.status(400).send({ "message": "Something went wrong while fetching user" });
            }
            if (!response) {
                return res.status(400).send({ "message": "Password does not match" });
            }


            // Generate salt for password
            bcrypt.genSalt(10, function (err, salt) {

                if (err) {
                    return res.status(501).send({ "message": "Something went wrong while updating password" });
                }

                // encrypt password using salt

                bcrypt.hash(newPass, salt, function (err, hash) {
                    if (err) {
                        return res.status(501).send({ "message": "Something went wrong while updating password" });
                    }

                    User.findOneAndUpdate({ _id: req.user }, {
                        password: hash
                    }, (err_u, res_u) => {

                        if (err_u) {
                            return res.status(501).send({ "message": "Something went wrong while updating password" });
                        }
                        if (!res_u) {
                            return res.status(404).send({ "message": "Password does not updated" });
                        }

                        return res.status(200).send({ "message": "Password Successfully updated" });

                    })
                });

            });
        })
    });

}

module.exports = updatePassword;