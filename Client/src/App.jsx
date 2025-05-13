import React from 'react';
import Register from './assets/Pages/Register';
import Layout from './assets/Components/Layout';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './assets/Pages/Login';
import Home from './assets/Pages/Home';
import UserProfile from './assets/Pages/UserProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Login />} /> 
          <Route path='register' element={<Register />} />
          <Route path='profile' element={<UserProfile />} />
          <Route path='home' element={<Home/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
