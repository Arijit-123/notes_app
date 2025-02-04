import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


function NoteModal({closeModal, addNote, currentNode, editNote}) {


const [title, setTitle]=useState('');
const [description,setDesrciption]=useState('');
const navigate =useNavigate();
console.log("current nodes",currentNode );

useEffect(() => {
  if(currentNode){
    setTitle(currentNode.title)
    setDesrciption(currentNode.description)
  }

  
}, [currentNode])



const handlesubmit= async(e)=>{
    e.preventDefault();
   addNote(title, description)
   if(currentNode){
    editNote(currentNode._id, title,description )
   }else{
    addNote(title, description)
   }
}


  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center'>
<div className='bg-white p-8 rounded'>
    <h2 className='text-xl font-bold mb-4'>{currentNode ? "Edit Note":"Add new Note"}  </h2>

<form onSubmit={handlesubmit}>
<input
type='text' value={title} onChange={(e)=>setTitle(e.target.value)}
placeholder='Note Title' className='border p-2 w-full mb-4'
>
</input>
<textarea value={description} onChange={(e)=>setDesrciption(e.target.value)}
    placeholder='Notes Decription' className='border p-2 w-full mb-4'>

</textarea>
<button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
    {currentNode?"Update Note":"Add Note" }
</button>
</form>
<button className='mt-4 text-red-500' onClick={closeModal}>Cancel</button>
</div>



    </div>
  )
}

export default NoteModal