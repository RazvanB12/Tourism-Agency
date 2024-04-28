import { Route } from 'react-router-dom';
import './App.css';
import { Routes } from 'react-router-dom';
import axios from "axios";
import React, { useEffect } from 'react'
import Login from "./component/Login";
import Home from "./component/Home";
import Destinations from "./component/Destinations";
import Contact from "./component/Contact";
import Register from "./component/Register";
import AgentPage from './component/AgentPage';
import EditDestination from './component/EditDestination';
import AddDestination from './component/AddDestination';
import Reservations from './component/Reservations';
import Situation from './component/Situation';

function App() {

  useEffect (() => {
      getLocation()
  }, []);

  const getLocation = async() => {
      const location = await axios.get("https://ipapi.co/json");
      if (location.data != null) {
        sessionStorage.setItem("city", location.data.city);
        sessionStorage.setItem("longitude", location.data.longitude);
        sessionStorage.setItem("latitude", location.data.latitude);
      }
  };


  return (
    <>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/destinations" element={<Destinations/>}></Route>
      <Route path="/contact" element={<Contact/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/agent" element={<AgentPage/>}></Route>
      <Route path="/edit/:id" element={<EditDestination/>}></Route>
      <Route path="/add" element={<AddDestination/>}></Route>
      <Route path="/reservations/:id" element={<Reservations/>}></Route>
      <Route path="/situation/:id" element={<Situation/>}></Route>
    </Routes>
    </>
  );
}

export default App;
