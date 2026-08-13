const express = require('express');
const multer = require('multer');
const uploadFile = require('./services/storage.service');
const postModel = require('./models/post.model');

const app = express();
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/create-post', upload.single("image"), async (req, res) => {
    try {
        const data = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: "file not found"
            });
        }

        const base64File = file.buffer.toString('base64');
        const result = await uploadFile(base64File);
        console.log(result);

        const newPost = await postModel.create({
            title : data.title || "Untitled post",
            image : result.url,
            imageFileId : result.fileId
        });
    
        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post : newPost
        });

    } catch(error) {
        console.error("Route Crash Log:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Upload Pipeline Failed",
            error: error.message
        });
    }
});

app.get('all-post', async (req, res) => {
    try {
        const allPost = await postModel.find().sort({createdAt : -1});

        res.status(200).json({
            success : true,
            massage : "Posts fetched sunccessfully",
            post : allPost
        });

    } catch (error) {

        console.log("Error in fetching post", error);
        res.status(500).json({
            success : false,
            message : "Error in fetching post",
            error : error.message
        })
    }
})

module.exports = app;
