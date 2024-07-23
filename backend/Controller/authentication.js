
// This File is for sending response if Auth is successfull for middelware "Auth"
// Auth is middleware so if i tried to send success response it will return the next page.
const authentication = (req, res) => {

    if (req.user) {

        return res.status(200).send({ "message": "Authentication Success" })

    }

    else {

        // By the way this will not run😂, Out of scope
        return res.status(200).send({ "message": "Invalid Authentication" })

    }
}

module.exports = authentication;