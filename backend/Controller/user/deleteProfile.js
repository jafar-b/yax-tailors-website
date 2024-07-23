const User = require("../../Models/user");
const bcrypt = require("bcrypt");

const deleteProfile = (req, res) => {

    const pass = req.body.pass;

    if (!req.user) {
        return res.status(400).send({
            "message": "You are logged in , Please Login."
        })
    }

    if (!pass || pass === undefined) {
        return res.status(400).send({
            "message": "Please Enter Your Password"
        })
    }

    User.findOne({ _id: req.user }, (err, user) => {

        if (err) {
            return res.status(501).send({ "message": "Something goes went wrong during deleting Profile" });
        }

        if (!user) {

            return res.status(404).send({ "message": "User Not Found. Invalid User" });

        }


        // verify password
        bcrypt.compare(pass, user.password, (c_err, c_res) => {

            // error
            if (c_err) {
                return res.status(501).send({ "message": "Something goes went wrong during deleting Profile" });
            }

            if (!c_res) {
                return res.status(404).send({ "message": "Old Password Does Not Match." });
            }

            // delete user profile
            User.findOneAndDelete({ _id: req.user }, (d_err, d_res) => {

                // error
                if (d_err) {
                    return res.status(501).send({ "message": "Something goes went wrong during deleting Profile" });
                }

                if (!d_res) {
                    return res.status(404).send({ "message": "User Profile does not Deleted successfully" });
                }

                return res.status(200).send({ "message": "User Profile Deleted successfully" });
            })

        });

    })

}
module.exports = deleteProfile;