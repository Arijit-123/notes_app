import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
const Signup=()=>{
const [name,setName]=useState('');
const [email, setEmail]=useState('');
const [password,setPassword]=useState('');
const [username,setUsername]=useState('');
const handlesubmit= async(e)=>{
    e.preventDefault();
    try{
const response= await axios.post('http://localhost:5000/api/auth/register',{username,name,email,password});

console.log("this is response", response);
    }catch(error){

    }
}
    return (

        <>

<div className='flex justify-center items-center min-h-screen bg-gray-100'>
    <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4 text text-cyan-500'>Sign up</h2>
<form onSubmit={handlesubmit}>
    <div>
        <div>
        <label htmlFor="username" className='block text-gray-700'>user Name</label>
        <input type='text ' className='w-full px-3 py-2 border' onChange={(e)=> setUsername(e.target.value)} placeholder='enter username'  required></input>
        </div>
    </div>
        <div>
<label htmlFor="name" className='block text-gray-700'> Name</label>
<input type='text ' className='w-full px-3 py-2 border' onChange={(e)=> setName(e.target.value)} placeholder='enter Name'  required></input>
        </div>
        <div>
            <label htmlFor="email" className='block text text-gray-700'> Email</label>
            <input type='email' className='w-full px-3 py-2 border ' onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Email" required></input>
        </div>
        <div>
            <label className='block text text-gray-700' htmlFor='password'> Password</label>
            <input type='password' className='w-full px-3 py-2 border' onChange={(e)=> setPassword(e.target.value)} placeholder='******'></input>
        </div>
        <div className='mb-4'>
            <button type='submit' className='w-full bg-green-600 text-white py-2 mt-2'>
         signup

            </button>
            <p>Already Have Account ? <Link to="/login">Login</Link></p>
        </div>
        </form>
        </div>
        </div>
        </>
    )
}

export default Signup;

