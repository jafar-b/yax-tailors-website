const mongoose = require("mongoose");

const Contact = new mongoose.Schema({

    /*   
    
    Not required user id
      user: {
          type: mongoose.Types.ObjectId
      }, 
    
      */

    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    messageOn: {
        type: String,
        default: new Date().toLocaleString()
    }

})

module.exports = mongoose.model("contact", Contact);