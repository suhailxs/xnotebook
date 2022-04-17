import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props)=>{
    const s1 = {
        "name" : "suhail",
        "class" :"4b"
    }
    const [state, setstate] = useState(s1);
    const update  = ()=>{
        setTimeout(() => {
            setstate({"name" : "xstechie",
            "class" :"10b"})
        }, 1000);
    }
    return (
        <NoteContext.Provider value={{state , update}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;