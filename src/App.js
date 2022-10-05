import './App.css';
import { useState } from 'react';
import AddTask from './components/addTask';
import ListTasks from './components/ListTasks';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UpdateTask from './components/UpdateTask';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';


const App = () => {


  const Container = styled.div`

  `;

  return (
    <Container>
      <div style={{paddingBottom:"100px"}}>
      <Navbar /> 
      </div>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/tasks" element={<ListTasks />}></Route>
        <Route path="/tasks/updateTask/:id" element={<UpdateTask />}></Route>
        <Route path="/users/signUp" element={<SignUp />}></Route>
        <Route path="/users/signIn" element={<SignIn />}></Route>
      </Routes>
      

    </Container>
  );
};

export default App;
