import React ,{useContext} from "react";
import NoteContext from "../context/notes/noteContext";

const Noteitems = (props) => {
  const context = useContext(NoteContext);
  const { note,  updateNote } = props;
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}
          </p>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully",'success');}}></i>
          <i className="fa-solid fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
          
        </div>
      </div>
    </div>
  );
};

export default Noteitems;
