import './App.css';
import { useState } from "react";
import AddTask from './components/addTask';
import ListTasks from './components/ListTasks';
import Navbar from './components/Navbar';
import styled from 'styled-components';
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";


const App = () => {
  const [task, setTask] = useState({
    taskName: "",
    completed: false,
  });

  const Container = styled.div`
  background: #e5e7e9;
  height: 100vh;
`;

  return (
    <Container>
       <Navbar />
    <div className="App">
      <br/>
      <h2>Task App</h2>
      <AddTask task={task} setTask={setTask} />
      <ListTasks setTask={setTask} />
    </div>
    </Container>
  );
};

export default App;
