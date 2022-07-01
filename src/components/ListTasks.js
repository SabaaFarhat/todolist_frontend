import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import moment from "moment";
import '../App.css';
import { deleteTask, getTasks } from '../redux/slices/taskSlice';
import { Button, CircularProgress, Card } from '@material-ui/core';
import moment from 'moment';

const ListTasks = ({ setTask }) => {
  const dispatch = useDispatch();
  const tasksState = useSelector((state) => state.tasks);
  //  const { tasks } = tasksState;

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div>
      <h2> You have {tasksState && tasksState.length} tasks </h2>
      {tasksState.getTasksStatus === 'pending' ? <CircularProgress /> : null}
      {tasksState?.map((task) => (
        <Card
          variant="outlined"
          sx={{
            padding: '0.7rem',
            marginBottom: '2rem',
          }}
          key={task._id}
        >
          <h3>{task.taskName}</h3>
          <p>Added: {moment(task.date).fromNow()}</p>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setTask({ ...task })}
            sx={{
              fontFamily: "'Abel', 'sansSerif'",
            }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              marginLeft: '0.7rem',
              fontFamily: "'Abel', 'sansSerif'",
            }}
            onClick={() => handleDelete(task._id)}
          >
            Delete
          </Button>
        </Card>
      ))}
      
    </div>
  );
};

export default ListTasks;
