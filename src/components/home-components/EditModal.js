import React from 'react'
import { useContext, useRef } from 'react'
import NoteContext from '../../context/notes/NoteContext'

const EditModal = (props) => {
  const { editNote } = useContext(NoteContext);
  const {currentNote, setCurrentNote} = props;

  const onChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    await editNote(currentNote._id, currentNote.title, currentNote.description, currentNote.tag);
    refClose.current.click();
  }

  const refClose = useRef(null);

  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <form action='put'>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} value={currentNote.title} minLength={5} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' aria-describedby="emailHelp" onChange={onChange} value={currentNote.description} minLength={5} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tags</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={currentNote.tag} />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
              <button disabled={currentNote.title.length < 5 || currentNote.description.length < 5} type="button" className="btn btn-primary" onClick={handleEdit}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditModal