/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from '../../context/notes/NoteContext'
import AddNote from './AddNote';
import FetchNotes from './FetchNotes';


const Notes = () => {
  const { fetchNotes } = useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token")) {
      fetchNotes();
    }
    else {
      navigate("/login");
    }
  }, [])

  return (
    <>
      <AddNote />
      <FetchNotes />
    </>
  )
}

export default Notes