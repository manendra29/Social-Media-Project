import './App.css'
import Login from './pages/Login/Login.jsx'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile.jsx'
import Register from './pages/Register/Register.jsx'
import {BrowserRouter ,Route, Routes,Navigate} from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext.jsx'

function App() {
  const {user} =useContext(AuthContext);
  return (
    <>
 <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user ?<Home />:<Register />} />
          <Route path="/login" element={user ? <Navigate to="/" /> :<Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> :<Register />} />
          <Route path="/profile/:username" element={<Profile />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
