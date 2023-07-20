import React, { useState } from 'react';
import './App.css';
import { Routes,Route, BrowserRouter,useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar1 from "./components/navabar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercises.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

import { useSelector } from 'react-redux';

import LoginForm from './components/Login';
import SignupForm from './components/signup';

function App() {
  const isLoggedIn=useSelector(state=>state.isLoggedIn)
  console.log(isLoggedIn)
 
  return (
    
    <BrowserRouter>
    
    <Navbar1/>
    <br/>
    <Routes>
    
    <Route path="/exerciselist" exact Component={ExercisesList}/>
    <Route path="/edit/:id" exact Component={EditExercise}/>
    <Route path="/create" exact Component={CreateExercise}/>
    <Route path="/user" exact Component={CreateUser}/>
    <Route path="/login" exact Component={LoginForm}/>
    <Route path="/" exact Component={SignupForm}/>
    
</Routes>

</BrowserRouter>
    
      
    
  );
}

export default App;
