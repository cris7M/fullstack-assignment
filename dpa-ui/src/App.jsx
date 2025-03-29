import React, {useState, useEffect} from "react";
import axios from "axios"

function App(){

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error,setError] = useState("");


  useEffect(() =>{
    fetchNote();
  },[])

  const fetchNote = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/notes`);
      setNotes(response.data);
    }catch(error){
      setError("Failed to fetch notes.")
    }
  }


  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/notes/${id}`);
      setNotes(notes.filter(note => note.id !== id));
    }catch(error){
      setError("Failed to delete note.")
    }
  }

  const addNote = async () => {

    if (!title || !content){
      setError("Both field  are required")
      return;
    }

    try {

      const response = await axios.post("http://127.0.0.1:5000/notes", {title,content});
      setNotes([...notes,response.data]);
      setTitle("");
      setContent("");
      setError("");


    }catch(error){
      setError("failed to add note.")
    }
  }

  return (

    <div style={{padding: "20px"}}>

      <h2>Notes App</h2>

      {error && <p style={{ color :"red" }}> {error} </p> }

      <div>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

      </div>
      <br />
      <div>

      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      </div>

      <br />
      <div>
      
        <button onClick={addNote}> Add Note </button>
      </div>
      <br />

      <ul>
         {notes.map((note) => (
          <li key={note.id}> <strong>{note.title}</strong> : {note.content}
          <button onClick={()=> deleteNote(note.id)}> Delete </button>
          </li>
         ))}  
      </ul>
      
    </div>
  )
}


export default App;