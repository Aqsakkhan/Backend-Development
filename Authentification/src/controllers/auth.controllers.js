const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {
    try {
    
        const data = req.body;
    
        if (!data) {
            console.log("Data not found")
            return res.status(400).json({
                message : "Data not found"
            })
        }   

        const userExistAlready = await userModel.findOne({
            Email : data.Email
        })

        if (userExistAlready) {
            return res.status(409).json({
                message : "User exist already"
            })
        }

        const newUser = await userModel.create({
            FirstName : data.FirstName,
            LastName : data.LastName,
            Email : data.Email,
            Password : data.Password
        })
        
        const token = jwt.sign(
            {id : newUser._id, email : newUser.Email},
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24h' }
        )

        res.cookie("token", token)

        return res.status(201).json({
            message : "User registred successfully",
            user : {id : newUser._id, Email : newUser.Email}
        })
            
    } catch(error) {
        console.log("Error in registring user", error.message)
        return res.status(500).json({
            message : "User not registred",
            error : error.message
        })
    }
}

module.exports = { registerUser }