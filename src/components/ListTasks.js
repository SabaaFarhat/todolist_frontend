import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import moment from "moment";
import '../App.css';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { deleteTask, getTasks } from '../redux/slices/taskSlice';
import { Link } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AddTask from './addTask';

const ListTasks = ({ setTask }) => {
  const dispatch = useDispatch();
  const tasksState = useSelector((state) => state.tasksState);
  const { tasks } = tasksState;
  let navigate = useNavigate();
  // const { id } = useParams();

  // console.log('hhhh', id);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleUpdate = (id) => {
    navigate(`/tasks/updateTask/${id}`);
  };

  return (
    <div>
      <div>
      <AddTask  />
      </div>
      <h2> You have {tasks && tasks.length} tasks </h2>
      <div className="grid">
        {tasksState.getTasksStatus === 'pending' ? <CircularProgress /> : null}
        {tasks?.map((task) => (
          <div className="card m-3 surface-border" key={task._id}>
            <Card title={task.taskName} style={{ width: '25em' }}>
              <span className="font-bold text-l text-500">
                Added {moment(task.startedDate).fromNow()}
              </span>

              <p>
                Duration{' '}
                <span className="font-bold text-xl text-500">
                  {task.Duration}
                </span>{' '}
                days{' '}
              </p>
              <p className="m-0" style={{ lineHeight: '1.5' }}>
                is Completed :{task.completed}
              </p>

              <span>
                <Button
                  label="Update"
                  icon="pi pi-undo"
                  //onClick={() => setTask({ ...task })}
                  onClick={() => handleUpdate(task._id)}
                />
                
                <Button
                  label="Delete"
                  icon="pi pi-times"
                  className="p-button-secondary ml-2"
                  onClick={() => handleDelete(task._id)}
                />
              </span>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListTasks;
