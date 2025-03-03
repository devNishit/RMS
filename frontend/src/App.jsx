import { useState } from 'react'
// import './App.css'
import './css/App.css'
import {BrowserRouter as Router, Routes ,Route, Link} from 'react-router-dom';
import Home from './users/admin/Home';
import Users from './users/admin/Users';
import Register from './users/Register';
import Login from './users/Login';
import EditUser from './users/admin/EditUser';
import ResetPass from './users/ResetPass';
import GenratePass from './users/GenratePass';

function App() {

  return (
    <>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/items">Items</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/sales">Sales</Link>
            </li>
            <li>
              <Link to="/reservations">Reservations</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/edit-user/:id' element={<EditUser/>}/>
          <Route path='/reset-pass' element={<ResetPass/>}/>
          <Route path='/genPass/:id' element={<GenratePass/>}/>
          
        </Routes>
      </Router>
    </>
  )
}

export default App
