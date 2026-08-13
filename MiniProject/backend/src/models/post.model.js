const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type : String,
        required : true,
        trim : true
    },
    image: {
        type : String,
        required : true
    },
    imageFileId: {
        type : String,
        required : true
    },
}, {
    timestamps : true
})

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;