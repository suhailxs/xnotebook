import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props)=>{
    const notesInitial = [
        {
          
          "_id": "625b149fd620279102623a3d",
          "user": "6259e8a061e9d66fea25c091",
          "title": "mytitle",
          "description": "suhail wait up  haha",
          "tag": "suhail",
          "date": "2022-04-16T19:10:23.964Z",
          "__v": 0
        },
        {
          "_id": "625c7e8c480f27b781qa198a",
          "user": "6259e8a061e9d66fea25c091",
          "title": "workign on some projects",
          "description": "Once upon a time there was a person named xstechie has a instagram page called xstechie",
          "tag": "xstechie , suhail",
          "date": "2022-04-17T20:54:33.141Z",
          "__v": 0
        },
        {
          "_id": "625c7e8c480f27b781wa198a",
          "user": "6259e8a061e9d66fea25c091",
          "title": "workign on some projects",
          "description": "Once upon a time there was a person named xstechie has a instagram page called xstechie",
          "tag": "xstechie , suhail",
          "date": "2022-04-17T20:54:35.141Z",
          "__v": 0
        },
        {
          "_id": "625c7e8c480f27b781ca198a",
          "user": "6259e8a061e9d66fea25c091",
          "title": "workign on some projects",
          "description": "Once upon a time there was a person named xstechie has a instagram page called xstechie",
          "tag": "xstechie , suhail",
          "date": "2022-04-17T20:54:46.141Z",
          "__v": 0
        },
        {
          "_id": "625c7e8c480f27b781ab198a",
          "user": "6259e8a061e9d66fea25c091",
          "title": "workign on some projects",
          "description": "Once upon a time there was a person named xstechie has a instagram page called xstechie",
          "tag": "xstechie , suhail",
          "date": "2022-04-17T20:54:36.141Z",
          "__v": 0
        },
      ]
      const [notes, setNotes] = useState(notesInitial);

      //Add a Note
      const addNote = (title, description , tag) =>{
        //TODO : API Call
        console.log("Adding a Note/")
        let note = {
          "_id": "625c7e8c480f27b781aa198a",
          "user": "6259e8a061e9d66fea25c091",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2022-04-17T20:24:36.141Z",
          "__v": 0
        };
        setNotes(notes.concat(note));
      }

      //Delete a Note
      const deleteNote = (id) =>{
        //TODO : API Call
        console.log("Deleting the note");
        const newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote)
      }

      //Edit a Note
      const editNote = () =>{
        
      }

    return (
        <NoteContext.Provider value={{notes , addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;