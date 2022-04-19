import React, {useContext} from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitems from "./Noteitems";

const Notes = () => {
    const context = useContext(NoteContext);
    const {notes , setNotes} = context;
  return (
    <div>
      <div className="row  my-3">
      <h2>Add a note</h2>
      {notes.map((note)=>{
        return <Noteitems note={note}/>
      })}
      </div>
    </div>
  )
}

export default Notes
