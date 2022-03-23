import React from 'react'
import { useContext } from 'react'
import NoteContext from '../../context/notes/NoteContext'

const NoteItem = (props) => {
  const { note } = props;
  const { deleteNote } = useContext(NoteContext);

  const handleDelete = () => {
    deleteNote(note._id);
  }

  const handleEdit = () => {
    props.updateNote(note);
  }

  return (
    <div className='my-3 col-md-4'>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i className="fa-solid fa-trash-can mx-2" onClick={handleDelete} ></i>
              <i className="fa-solid fa-pen-to-square mx-2" onClick={handleEdit} ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem