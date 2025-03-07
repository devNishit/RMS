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
import LogoutButton from './users/logout';
import AddUser from './users/admin/AddUser';
import AddMenuItem from './menu/AddMenuItem';
import EditMenu from './menu/EditMenu';
import ManageMenu from './menu/ManageMenu';
import MenuList from './menu/MenuList';

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
              <Link to="/menu">Menu</Link>
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
            <li>
              <Link to="/logout">Log Out</Link>
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
          <Route path='/logout' element={<LogoutButton/>}/>
          <Route path='/addUser' element={<AddUser/>}/>
          <Route path='/menu/add' element={<AddMenuItem/>}/>
          <Route path='/menu/edit/:id' element={<EditMenu/>}/>
          <Route path='/menu' element={<ManageMenu/>}/>
          <Route path='/menu/list' element={<MenuList/>}/>
          
        </Routes>
      </Router>
    </>
  )
}

export default App
