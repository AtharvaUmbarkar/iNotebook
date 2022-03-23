/* eslint-disable no-unused-vars */
import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";
const _ = require('lodash');

const NoteState = (props) => {
    const host = "http://localhost:5000"

    const initialNotes = [
        {
            "_id": "621c1207d4993f2304ecebb8",
            "user": "621bcbe560ea54efe0c49fcb",
            "title": "First Note",
            "description": "My first Description",
            "tag": "personal",
            "date": "2022-02-28T00:06:31.380Z",
            "__v": 0
        },
        {
            "_id": "621ced7f8be8d56d112251b8",
            "user": "621bcbe560ea54efe0c49fcb",
            "title": "First Note",
            "description": "My first Description",
            "tag": "personal",
            "date": "2022-02-28T15:42:55.961Z",
            "__v": 0
        },
    ]

    const [notes, setNotes] = useState(initialNotes);

    //* Add Note
    const addNote = async (title, description, tag) => {
        const addUrl = host + "/api/notes/addnote";
        const response = await fetch(addUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token"),
            },
            body: JSON.stringify({
                title: title,
                description: description,
                tag: tag,
            }),
        });

        const json = await response.json();
        // console.log("Added: ");
        // console.log(json);

        setNotes(notes.concat(json));
    }

    //* Delete Note
    const deleteNote = async (id) => {
        // console.log("Deleteing note with id " + id);

        const deleteUrl = host + "/api/notes/deletenote/" + id;
        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token"),
            },
            body: JSON.stringify({}),
        });

        const json = await response.json();
        // console.log("Deleted: ");
        // console.log(json);

        const newNotes = notes.filter((note) => {
            return note._id !== id;
        })
        setNotes(newNotes);
    }

    //* Edit Note
    const editNote = async (id, title, description, tag) => {
        const editUrl = host + "/api/notes/updatenote/" + id;
        const response = await fetch(editUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token"),
            },
            body: JSON.stringify({
                title: title,
                description: description,
                tag: tag,
            }),
        });

        const json = await response.json();

        let newNotes = _.cloneDeep(notes);

        for (let index = 0; index < newNotes.length; index++) {
            if (newNotes[index]._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }

        // console.log("Edited to: ");
        // console.log(json);

        setNotes(newNotes);
    }

    //* Fetch Note
    const fetchNotes = async () => {
        const fetchUrl = host + "/api/notes/fetchallnotes";
        const response = await fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token"),
            },
        });

        const json = await response.json();
        setNotes(json);
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;