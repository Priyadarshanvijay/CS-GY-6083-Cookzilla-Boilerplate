import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AuthService from './services/auth.service';

import Login from './components/Login';
import Register from './components/Register';
import Search from './components/Search';
import People from './components/People'

import EventBus from './common/EventBus';
import Home from "./components/Home";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import FriendRequestModal from "./components/FriendRequestModal";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showFriendRequestModal, setShowFriendRequestModal] = useState(false)
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on('logout', () => {
      logOut();
    });

    return () => {
      EventBus.remove('logout');
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={'/'} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={'/search'} className="nav-link">
              Search
            </Link>
          </li>
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            {showFriendRequestModal && <FriendRequestModal setShowFriendRequestModal={setShowFriendRequestModal}/>}
            <li  className="nav-item" style={{cursor: 'pointer'}}  onClick={()=>{
              setShowFriendRequestModal(!showFriendRequestModal)
            }}>
              <FontAwesomeIcon  style={{marginTop: '12px', marginRight: '16px', color: 'lightgrey'}} icon={faUser} />
            </li>
            <li className="nav-item">
            <Link to={'/people'} className="nav-link">
              Users
            </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={'/login'} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={'/register'} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div style={{height: '100%'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/people" element={<People />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;