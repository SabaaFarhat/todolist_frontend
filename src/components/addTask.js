import { Button, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import { tasksAdd, updateTask } from '../redux/slices/taskSlice';

const AddTask = ({ task, setTask }) => {
  const dispatch = useDispatch();
  const tasksState = useSelector((state) => state.tasks);

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
    }

    setTask({
      taskName: '',
      completed: false,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          value={task.taskName}
          onChange={(e) => setTask({ ...task, taskName: e.target.value })}
        />
        <br />
        <button
          type="submit"
          variant="contained"
          size="small"
          sx={{
            margin: '0.9rem 0rem',
            fontFamily: "'Abel', 'sansSerif'",
          }}
        >
          {tasksState.addTaskStatus === 'pending' ||
          tasksState.updateTaskStatus === 'pending' ? (
            <CircularProgress size={24} color="secondary" />
          ) : task._id ? (
            'Update Task'
          ) : (
            'Add Task'
          )}
        </button>
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
