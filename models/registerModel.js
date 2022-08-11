const mongoose = require("mongoose");

const registerUserSchema = new mongoose.Schema({
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "supervisor", "admin"]
    },
    accessToken: {
        type: String
    },
    email: {
        type: String,
        required: true,
        min: 5,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024,
    },
    name: {
        type: String,
        required: true,
        min: 5,
        max: 255},
    
    created: {
        type: Date,
        default: Date.now,
        
    }

});

//   created DateTime
//   roleId ObjectId [ref: > Role._id, default: null]
//   updated DateTime
// }

module.exports = mongoose.model("User", registerUserSchema);