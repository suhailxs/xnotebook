import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  //Get all Notes
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1OWU4YTA2MWU5ZDY2ZmVhMjVjMDkxIn0sImlhdCI6MTY1MDEyMzY0Mn0.AuJjWslYY2h85ytcQnBu7RTwH-ruzSoHHlsgpYcVjZQ",
      },
    });
    const json = await response.json()
    console.log(json);
    setNotes(json);
  };
  const [notes, setNotes] = useState(notesInitial);

  //Add a Note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1OWU4YTA2MWU5ZDY2ZmVhMjVjMDkxIn0sImlhdCI6MTY1MDEyMzY0Mn0.AuJjWslYY2h85ytcQnBu7RTwH-ruzSoHHlsgpYcVjZQ",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json = response.json();

    //Logic to Add in Client
    console.log("Adding a Note/");
    let note = {
      _id: "625c7e8c480f27b781aa198a",
      user: "6259e8a061e9d66fea25c091",
      title: title,
      description: description,
      tag: tag,
      date: "2022-04-17T20:24:36.141Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = async (id) => {
    //TODO : API Call
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1OWU4YTA2MWU5ZDY2ZmVhMjVjMDkxIn0sImlhdCI6MTY1MDEyMzY0Mn0.AuJjWslYY2h85ytcQnBu7RTwH-ruzSoHHlsgpYcVjZQ"
      },
    });
    const json =  response.json();
    console.log(json);

    //Logic to Delete in Client
    console.log("Deleting the note");
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI1OWU4YTA2MWU5ZDY2ZmVhMjVjMDkxIn0sImlhdCI6MTY1MDEyMzY0Mn0.AuJjWslYY2h85ytcQnBu7RTwH-ruzSoHHlsgpYcVjZQ",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json = response.json();

    //Logic to edit in Client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
