import React ,{useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext';

export const About = () => {
  const name = useContext(noteContext);
  useEffect(() => {
    name.update();
  }, [])
  
  return (
    <div>This is About {name.state.name}</div>
  )
}

export default About;