import Signup from "./Signup/Signup"
import Login from "./Login/Login"
import Home from './Home/Home'
import AddNote from './AddNote/AddNote'

import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>}/>
          <Route path="/signup" element={<Signup></Signup>}/>
          <Route path="/Home" element={<Home></Home>}/>
          <Route path="/Addnote" element={<AddNote></AddNote>}/>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App;
