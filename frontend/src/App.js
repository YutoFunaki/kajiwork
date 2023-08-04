import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/loginPage';
import Signin from './pages/signinPage';
import Home from './pages/homePage';
import CompleteWorkPage from './pages/completeWorkPage';
import ConnectWork from './pages/connectWorkPage';
import Manage from './pages/workManagePage';
import NewWork from './pages/newWorkPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="Signin" element={<Signin />} />
        <Route path="Home" element={<Home />} />
        <Route path="completeForm" element={<CompleteWorkPage />} />
        <Route path='connectWork' element={<ConnectWork />}></Route>
        <Route path='Manage' element={<Manage />}></Route>
        <Route path='NewWork' element={<NewWork />}></Route>
      </Routes>
    </div>
  );
}

export default App;

