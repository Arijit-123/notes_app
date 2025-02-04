import logo from './logo.svg';
import './App.css';
import Signup from './Pages/Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='/register' element={<Signup/>}></Route>
<Route path='/login' element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
