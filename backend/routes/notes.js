const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fu = require('../middleware/fetch-user');
const Note = require('../models/Note')

//* Route 1: Get all the notes. GET "/api/notes/fetchallnotes". Login Required.

router.get("/fetchallnotes", fu.fetchUser, async (req, res) => {
    const notes = await Note.find({ user: req.user });
    res.json(notes);
});

//* Route 2: Add new note. POST "/api/notes/addnote". Login Required.

router.post("/addnote", fu.fetchUser, [
    body('title', "enter a valid title").isLength({ min: 5 }),
    body('description', "enter a valid description(>5 chars)").isLength({ min: 5 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;
        const note = new Note({
            user: req.user,
            title: title,
            description: description,
            tag: tag,
        });
        const savedNote = await note.save();
        res.json(savedNote);
    }
    catch (errors) {
        console.error(errors);
        res.status(500).send("Internal Server Error");
    }

});

//* Route 3: Update existing note. PUT "/api/notes/updatenote". Login Required.

router.put("/updatenote/:id", fu.fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        const newNote = {};

        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send("Not Found");

        if (note.user.toString() !== req.user) {
            return res.status(401).send("Not Allowed");
        }

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(updatedNote);
    }
    catch (errors) {
        console.error(errors);
        res.status(500).send("Internal Server Error");
    }

});

//* Route 4: Delete existing note. DELETE "/api/notes/deletenote". Login Required.

router.delete("/deletenote/:id", fu.fetchUser, async (req, res) => {

    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send("Not Found");

        if (note.user.toString() !== req.user) {
            return res.status(401).send("Not Allowed");
        }

        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        res.json({
            success: "Note deleted successfully",
            note: deletedNote,
        });
    }
    catch (errors) {
        console.error(errors);
        res.status(500).send("Internal Server Error");
    }

});

module.exports = router;
