
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const Auth = (req, res, next) => {

    const token = req.headers.token_id || req.cookies.token_id;
 
    if (!token || token === "undefined") {
        return res.status(401).send({
            message: "Authentication is required"
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (decoded.user_id) {

            User.findOne({ token: token }, (err, result) => {

                if (err)
                    return res.status(400).send({
                        message: "Authentication Error"

                    });


                if (!result) {
                    return res.status(400).send({
                        message: "Invalid Authentication"
                    });

                } else {

                    req.user = decoded.user_id;
                    req.location = result.location;


                    return next();


                }


            });
        }

    } catch {

        return res.status(400).send({ message: "Invalid Access Token" });

    }

}


module.exports = Auth;