import React from 'react'
import { useContext, useRef, useState } from 'react'
import NoteContext from '../../context/notes/NoteContext'
import NoteItem from './NoteItem';
import EditModal from './EditModal';

const FetchNotes = () => {
  const { notes } = useContext(NoteContext);
  const [currentNote, setCurrentNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const updateNote = async (note) => {
    setCurrentNote(note);
    ref.current.click();
  }

  const ref = useRef(null);

  return (
    <>
      <button type="button" style={{ display: "none" }} ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Edit Note
      </button>

      <EditModal currentNote={currentNote} setCurrentNote={setCurrentNote}/>

      <h2 className='my-4'>Your Notes</h2>
      
      {notes.length === 0 && <div className='container'> No notes to display</div>}

      <div className='row'>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  )
}

export default FetchNotes