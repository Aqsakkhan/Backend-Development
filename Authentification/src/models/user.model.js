const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FirstName: {
        type : String,
        required : true,
        trim : true
    },
    LastName : {
        type : String,
        required : true,
        trim : true
    },
    Email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true
    },
    Password : {
        type : String,
        required : true,
        minLength : 8
    },
}, {
    timestamps : true
}
)

const userModel = mongoose.model("user", userSchema);

module.exports = userModel