// This Controller is for contact page
// user can send message with this controller 


const contact = require("../Models/contact");
const validateEmail = require("../utility/emailValidate");

const Contact = (req, res) => {

    const { name, email, subject, message } = req.body;

    // const user = req.header('user_id');

    if (!name) {
        return res.status(404).send({ "message": "Name is Required", "status": 400 });
    }

    /* Check email entered or not */
    if (!email) {

        return res.status(404).send({ "message": "Email is Required", "status": 400 });

    }

    /* Check email entered or not */
    if (!subject) {

        return res.status(404).send({ "message": "Subject is Required", "status": 400 });

    }

    /* Check email entered or not */
    if (!message) {

        return res.status(404).send({ "message": "Message is Required", "status": 400 });

    }

    if (validateEmail(email) == true) {

        const newMessage = new contact({
            name,
            email,
            subject,
            message
        });

        // if(user){
        //     newMessage.user=user
        // }

        newMessage.save();

        return res.status(200).send({ "message": "Your message sent Successfully" });

    } else {

        return res.status(404).send({ "message": "Invalid Email", "status": 400 });

    }



}

module.exports = Contact;