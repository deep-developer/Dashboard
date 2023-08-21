import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { auth } from './utils/firebase';
import Dashboard from './Components/Dashboard';

const App = () => {
  const [ username, setUsername ] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user){
        setUsername(user.displayName)
      }
      else{
        setUsername("")
      }
    })
  }, [])


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={ <Dashboard userName={username} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
