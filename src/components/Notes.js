import React, { useContext, useEffect, useRef,useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitems from "./Noteitems";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes,editNote } = context;
  const history = useNavigate();

  
  const [note, setnote] = useState({id:"",etitle:"",edescription : "", etag:"default"});
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else{
      history('/login')
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    
  };
  const handleClick = (e) => {
    refClose.current.click();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    props.showAlert("Updated Successfully",'success');
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const checkLength = ()=>{
    if(note.etitle.length>=5 && note.edescription.length>=5){
      return false;
    }
    else{
      return true
    }
  }

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* edit form here  */}
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    // aria-describedby="emailHelp"
                    onChange={onChange}
                    name="etitle"
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    onChange={onChange}
                    name="edescription"
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    onChange={onChange}
                    name="etag"
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" disabled={checkLength()} onClick={handleClick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row  my-3">
          <h2>Add a note</h2>
          <div className="container">
            {notes.length===0&&'no notes to display'}
          </div>
          {notes.map((note) => {
            return (
              <Noteitems note={note} updateNote={updateNote} key={note.date} showAlert={props.showAlert}/>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
