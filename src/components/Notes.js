import React, {useContext} from "react";
import NoteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitems from "./Noteitems";

const Notes = () => {
    const context = useContext(NoteContext);
    const {notes , addNote} = context;
  return (
      <>
    <AddNote/>
    <div>
      <div className="row  my-3">
      <h2>Add a note</h2>
      {notes.map((note)=>{
        return <Noteitems note={note} key={note.date}/>
      })}
      </div>
    </div>
    </>
  )
}

export default Notes
