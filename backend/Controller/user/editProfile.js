const User = require("../../Models/user");
const validateEmail = require("../../utility/emailValidate");

const editProfile = (req, res) => {

    if (!req.user) {
        return res.status(404).send({ "message": "Please Login" });
    }

    const { name, email, address } = req.body;

    if (!name || name === "undefined") {
        return res.status(400).send({ "message": "Name is Required", "status": 400 });
    }
    else if (!email || email === "undefined") {
        return res.status(400).send({ "message": "Email is Required", "status": 400 });
    }
    if (address === "undefined") {
        address = "";
    }


    if (validateEmail(email)) {


        User.findOneAndUpdate({ _id: req.user }, {
            name: name,
            email: email,
            location: address
        },
            {
                upsert: true
            },

            (u_err, u_res) => {

                if (u_err) return res.status(501).send({ message: "Something Goes went wrong during Profile Updating" });

                if (!u_res) {
                    return res.status(404).send({ message: "Something Goes went wrong during Profile Updating" });
                }

                return res.status(200).send({ message: "Your Profile Successfully Updated" });


            })
    } else {
        return res.status(400).send({ message: "Invalid Email" })
    }

}

module.exports = editProfile;