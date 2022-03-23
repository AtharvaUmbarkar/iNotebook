import React from 'react'
import { useContext, useState } from 'react'
import NoteContext from '../../context/notes/NoteContext'

const AddNote = () => {
  const { addNote } = useContext(NoteContext);
  const [newNote, setnewNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(newNote.title, newNote.description, newNote.tag);
    setnewNote({
      title: "",
      description: "",
      tag: "",
    });
  }

  const onChange = (e) => {
    setnewNote({ ...newNote, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <h2 className='my-3'>Add a Note</h2>
      <form action='post' onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' value={newNote.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' value={newNote.description} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tags</label>
          <input type="text" className="form-control" id="tag" name='tag' value={newNote.tag} onChange={onChange} />
        </div>
        <button disabled={newNote.title.length < 5 || newNote.description.length < 5} type="submit" className="btn btn-primary" >Add Note</button>
      </form>
    </div>
  )
}

export default AddNote