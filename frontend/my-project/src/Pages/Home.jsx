import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import NoteCrad from '../components/NoteCrad';
function Home() {

  const [isModelOpen, setModelOpen]=useState(false);
  const [filteredNotes, setFilteredNote]=useState(false);
   const [notes, setNotes]=useState([]);
const[currentNode, setCurrentNode]= useState(null)
const [query, setQuery]= useState('')
const navigate = useNavigate();

useEffect(() => {

  fetchNotes()
}, [notes])




const fetchNotes= async()=>{

  try{
const {data}= await axios("http://localhost:5000/api/note",{
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
    }
})
setNotes(data.notes)

  }
  catch(error){
console.log(error)
  }
}

useEffect(() => {
  setFilteredNote(notes.filter((note)=>note.title.toLowerCase().includes(query.toLowerCase())||
  note.description.toLowerCase().includes(query.toLowerCase())
))


}, [query, notes])



  const closeModal=()=>{
    setModelOpen(false);
  }


  const onEdit= (note) =>{
    setCurrentNode(note)
    setModelOpen(true)
  }
  const addNote= async(title, description)=>{
    try{
      const response= await axios.post('http://localhost:5000/api/note/add',
      {title, description},
        {
    headers: {
     Authorization: `Bearer ${localStorage.getItem("token")}`
     }

        }
      );
      
      console.log("this is response", response);
      
      if(response.data.success){
         
          closeModal()
      }
          }catch(error){
      console.log("this is error",error);
          }
  }


  const editNote= async(id, title, description)=>{
    try{
      const response= await axios.put(`http://localhost:5000/api/note/${id}`,
      { title, description},
        {
    headers: {
     Authorization: `Bearer ${localStorage.getItem("token")}`
     }

        }
      );
      
      console.log("this is response", response);
      
      if(response.data.success){
         
          closeModal()
      }
          }catch(error){
      console.log("this is error",error);
          }
  }

const deleteNote=async(id,title, description)=>{
  try{
    const response= await axios.delete(`http://localhost:5000/api/note/${id}`,
    { title, description},
      {
  headers: {
   Authorization: `Bearer ${localStorage.getItem("token")}`
   }

      }
    );
    
    console.log("this is response", response);
    
    if(response.data.success){
       
        closeModal()
    }
        }catch(error){
    console.log("this is error",error);
        }
}
  return (
    <div className='bg-gray-100 min-h-screen'>

      <Navbar setQuery={setQuery}/>

<div className='px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6'>
      {
 filteredNotes.length>0 ?   filteredNotes.map(note=>(
  <>
<NoteCrad note={note}  onEdit={onEdit} deleteNote={deleteNote}/>
  </>
)):<p>no notes</p>

      }
</div>
      <button
      onClick={()=>setModelOpen(true)}
      className=' fixed right-4 bottom-4 text text-2xl bg-teal-500 text-white font-bold p-4 rounded-full'>

+
      </button>

      {isModelOpen && <NoteModal closeModal={closeModal} addNote={addNote} currentNode={currentNode} editNote={editNote} />}
    </div>
  )
}

export default Home