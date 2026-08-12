const express = require('express');
const noteModel = require('./models/note.model')

const app = express()
app.use(express.json());

app.post('/notes', async (req, res) => {

    try {
        const data = req.body
        const newNote = await noteModel.create({
        title : data.title,
        description : data.description
    })

    res.status(201).json({
        success : true,
        message : "Note created successfully",
        note : newNote
    })
    } catch(error) {
        console.log("Error creating note", error)
        res.status(500).json ({
            success : false,
            message : "Failed to create note",
            error : error.message
        })
    }
    
})

app.get('/notes', async (req, res) => {
    try {
        const notes = await noteModel.find()

        res.status(200).json({
            success : true,
            message : "Notes fetched successfully",
            count : notes.length,
            notes : notes
    })
    } catch (error) {
        console.log("Error fetching note", error)
        res.status(500).json ({
            success : false,
            message : "Failed to fetch note",
            error : error.message
        })
    }
})

app.delete('/notes/:id', async (req, res) => {
    try {
        const noteId = req.params.id;

        const deletedNote = await noteModel.findByIdAndDelete(noteId);

        if (!deletedNote) {
            res.status(404).json({
                success : false,
                message : "Note not found"
            })
        }

        res.status(200).json({
            success : true,
            message : "Note deleted successfully",
            deletedNote : noteId
        })
        
    } catch (error) {
        onsole.log("Error deleting note", error)
        res.status(500).json ({
            success : false,
            message : "Failed to delete note",
            error : error.message
        })
    }
})

app.put('/notes/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        const updatedData = req.body

        const updatedNote = await noteModel.findByIdAndUpdate(noteId, updatedData, {new : true})

        if (!updatedNote) {
            res.status(404).json({
                success : false,
                message : "Note not found"
            })
        }

        res.status(200).json({
            success : true,
            message : "Note updated successfully",
            note : updatedNote
        })

    } catch (error) {
        onsole.log("Error updating note", error)
        res.status(500).json ({
            success : false,
            message : "Failed to update note",
            error : error.message
        })
    }

})

module.exports = app