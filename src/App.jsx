import './App.css';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Explore from './pages/Explore'; 
import MyEvents from './pages/MyEvents';
import Requested from './pages/Requested';
import AddEvent from './components/custom/AddEvent';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/explore' element={<Explore/>}/>
          <Route path='/myevents' element={<MyEvents/>}/>
          <Route path='/addevent' element={<AddEvent/>}/>
          <Route path='/requested' element={<Requested/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
