import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { tasksAdd, updateTask } from '../redux/slices/taskSlice';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

const AddTask = () => {
  const dispatch = useDispatch();
  const tasksState = useSelector((state) => state.tasksState);

  const [task, setTask] = useState({
    taskName: '',
    completed: false,
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task._id) {
      dispatch(updateTask(task));
    } else {
      const newTask = {
        ...task,
        startedDate: new Date(),
      };

      dispatch(tasksAdd(newTask));
      window.location.reload(false);
    }

    setTask({
      taskName: '',
      completed: false,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} >
        <br/>
      <label className='search'>Search :</label>
        <span className="p-float-label" >
          <InputText
            id="in"
            value={task.taskName}
            onChange={(e) => setTask({ ...task, taskName: e.target.value })}
          />
          <label htmlFor="in" >Task Name</label>
        </span>

        <Button type="submit" variant="contained" icon="pi pi-plus-circle" className='btn' style={{width :'200px'}} >
          {tasksState.addTaskStatus === 'pending' ||
          tasksState.updateTaskStatus === 'pending' ? (
            <CircularProgress size={24} color="secondary" />
          ) : task._id ? (
            'Update Task'
          ) : (
            'Add Task'
          )}
        </Button>
        {tasksState.addTaskStatus === 'rejected' ? (
          <alert severity="error">{tasksState.addTaskError}</alert>
        ) : null}
        {tasksState.addTaskStatus === 'success' ? (
          <alert severity="success">Task Added...</alert>
        ) : null}
        {tasksState.updateTaskStatus === 'rejected' ? (
          <alert severity="error">{tasksState.updateTaskError}</alert>
        ) : null}
        {tasksState.updateTaskStatus === 'success' ? (
          <alert severity="success">Task Updated...</alert>
        ) : null}
        {tasksState.deleteTaskStatus === 'rejected' ? (
          <alert severity="error">{tasksState.deleteTaskError}</alert>
        ) : null}
        {tasksState.deleteTaskStatus === 'success' ? (
          <alert severity="warning">A task was deleted...</alert>
        ) : null}
      </form>
    </>
  );
};

export default AddTask;
