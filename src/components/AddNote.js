import React , {useContext,useState} from 'react'
import NoteContext from "../context/notes/noteContext";


const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;


    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description : "", tag:""})
    };

    const onChange = (e) =>{
        setnote({...note,[e.target.name]:e.target.value});
    };
    const [note, setnote] = useState({title:"",description : "", tag:"default"})


    const checkLength = ()=>{
      if(note.title.length>5 && note.description.length>5){
        return false;
      }
      else{
        return true
      }
    }
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
            minLength={5}
            required
            value={note.title}
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
            minLength={5}
            required
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            onChange={onChange}
            name="tag"
            value={note.tag}
          />
        </div>

        {/* <button disabled={note.title.length<5 && note.description.length>5} type="submit" onClick={handleClick} className="btn btn-primary"> */}
        <button disabled={checkLength()} type="submit" onClick={handleClick} className="btn btn-primary">
          Add Note
        </button>
      </form>
      </div>
  )
}

export default AddNote
