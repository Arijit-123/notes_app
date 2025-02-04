import React, { useState } from 'react'
import axios from 'axios'
import {Link,useNavigate} from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
const Login=()=>{

const [name,setName]=useState('');
const [email, setEmail]=useState('');
const [password,setPassword]=useState('');
const [username,setUsername]=useState('');


const navigate =useNavigate();
const {login}= useAuth();
const handlesubmit= async(e)=>{
    e.preventDefault();
    try{
const response= await axios.post('http://localhost:5000/api/auth/login',{email,password});

console.log("this is response", response);

if(response.data.success){
console.log("response",response );
    login(response.data.user)
    localStorage.setItem("token", response.data.token)

navigate('/')
}

    }catch(error){
console.log("error", error);
    }
}
    return (

        <>

<div className='flex justify-center items-center min-h-screen bg-gray-100'>
    <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold mb-4 text text-cyan-500'>Login </h2>
<form onSubmit={handlesubmit}>
   
        
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
        Login

            </button>
            <p>Don't Have Account ? <Link to="/register">Register</Link></p>
        </div>
        </form>
        </div>
        </div>
        </>
    )
}

export default Login;

