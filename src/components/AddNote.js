import React , {useContext,useState} from 'react'
import NoteContext from "../context/notes/noteContext";


const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;


    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
    };

    const onChange = (e) =>{
        setnote({...note,[e.target.name]:e.target.value});
    };
    const [note, setnote] = useState({title:"",description : "", tag:"default"})
  return (
    <div className="container my-3">
      <h2>Add a note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
            </label>
          <input
            type="text"
            className="form-control"
            id="title"
            // aria-describedby="emailHelp"
            onChange={onChange}
            name="title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            onChange={onChange}
            name="description"
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" onClick={handleClick} className="btn btn-primary">
          Add Note
        </button>
      </form>
      </div>
  )
}

export default AddNote
