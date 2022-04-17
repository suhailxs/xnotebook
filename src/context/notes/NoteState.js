import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props)=>{
    const notesInitial = [
        {
          "_id": "625b149fd620279102613a3d",
          "user": "6259e8a061e9d66fea25c091",
          "title": "mytitle",
          "description": "suhail wait up  haha",
          "tag": "suhail",
          "date": "2022-04-16T19:10:23.964Z",
          "__v": 0
        },
        {
          "_id": "625c7e8c480f27b781aa198a",
          "user": "6259e8a061e9d66fea25c091",
          "title": "workign on some projects",
          "description": "Once upon a time there was a person named xstechie has a instagram page called xstechie",
          "tag": "xstechie , suhail",
          "date": "2022-04-17T20:54:36.141Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes , setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;