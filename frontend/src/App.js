import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {Register} from './pages/Register'
import Login from './pages/Login';
import Appointment from './pages/Appointment';
import Profile  from './pages/Profile';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/appointment' element={<Appointment />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/doctorProfile' element={<Register />}></Route>
        <Route path='/clinic' element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
